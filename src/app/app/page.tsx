"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Upload,
  Loader2,
  Download,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { CreditsDisplay } from "@/components/credits-display";
import { UserMenu } from "@/components/user-menu";
import { UpgradeModal } from "@/components/upgrade-modal";
import { analytics } from "@/lib/analytics";

const styles = [
  { id: "corporate", name: "Corporate", desc: "Clean, professional" },
  { id: "linkedin", name: "LinkedIn", desc: "Friendly, approachable" },
  { id: "creative", name: "Creative", desc: "Modern, artistic" },
  { id: "executive", name: "Executive", desc: "Premium, polished" },
];

export default function HeadshotApp() {
  const { data: session, update: updateSession } = useSession();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("corporate");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [credits, setCredits] = useState(session?.user?.credits ?? 0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user?.credits !== undefined) {
      setCredits(session.user.credits);
    }
  }, [session?.user?.credits]);

  const refreshCredits = useCallback(async () => {
    try {
      const res = await fetch("/api/user/credits");
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits);
        await updateSession();
      }
    } catch {
      // Silent fail
    }
  }, [updateSession]);

  useEffect(() => {
    analytics.appView();
    refreshCredits();
  }, [refreshCredits]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB");
      return;
    }

    setError(null);
    analytics.imageUpload();
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setGeneratedImage(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const generate = async () => {
    if (!uploadedImage) return;

    if (credits < 1) {
      setShowUpgradeModal(true);
      return;
    }

    setIsGenerating(true);
    setError(null);
    analytics.generateStart();
    analytics.styleSelect(selectedStyle);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: uploadedImage, style: selectedStyle }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.code === "NO_CREDITS") {
          setShowUpgradeModal(true);
          return;
        }
        throw new Error(data.error || "Generation failed");
      }

      setGeneratedImage(data.image);

      if (data.remainingCredits !== undefined) {
        setCredits(data.remainingCredits);
      } else {
        await refreshCredits();
      }

      analytics.generateComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const download = () => {
    if (!generatedImage) return;
    analytics.downloadClick();
    const link = document.createElement("a");
    link.download = "headshot.png";
    link.href = generatedImage;
    link.click();
  };

  const reset = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Header */}
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-medium tracking-tight text-white"
          >
            HeadshotAI
          </Link>

          <div className="flex items-center gap-4">
            <CreditsDisplay
              credits={credits}
              onClick={() => setShowUpgradeModal(true)}
            />
            {session?.user && <UserMenu user={session.user} />}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {error && (
          <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Upload */}
          <div>
            <h2 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">
              Your Photo
            </h2>

            {!uploadedImage ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-white/30 bg-white/[0.03]"
                    : "border-white/[0.08] hover:border-white/15 hover:bg-white/[0.02]"
                }`}
              >
                <Upload className="w-8 h-8 text-white/20 mb-4" />
                <p className="text-white/40 text-sm text-center px-8">
                  Drop your photo here
                  <br />
                  <span className="text-white/60">or click to browse</span>
                </p>
                <p className="text-white/20 text-xs mt-4">JPG, PNG up to 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] && handleFile(e.target.files[0])
                  }
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={reset}
                  className="w-full h-10 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:border-white/15 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Change photo
                </button>
              </div>
            )}
          </div>

          {/* Right: Style & Generate */}
          <div>
            <h2 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">
              Style
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedStyle === style.id
                      ? "border-white/30 bg-white/[0.05]"
                      : "border-white/[0.06] hover:border-white/15"
                  }`}
                >
                  <div className="font-medium text-sm text-white mb-0.5">
                    {style.name}
                  </div>
                  <div className="text-xs text-white/40">{style.desc}</div>
                </button>
              ))}
            </div>

            {!generatedImage ? (
              <>
                <button
                  onClick={generate}
                  disabled={!uploadedImage || isGenerating}
                  className="w-full h-12 rounded-lg bg-white text-black font-medium flex items-center justify-center gap-2 transition-all hover:bg-white/90 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate headshot
                    </>
                  )}
                </button>

                {uploadedImage && (
                  <p className="text-center text-white/30 text-sm mt-4">
                    {credits > 0
                      ? `${credits} credit${credits !== 1 ? "s" : ""} remaining`
                      : "No credits remaining"}
                  </p>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider">
                  Result
                </h3>
                <div className="aspect-square rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
                  <img
                    src={generatedImage}
                    alt="Generated headshot"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={download}
                    className="h-10 rounded-lg bg-white text-black font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={generate}
                    disabled={isGenerating}
                    className="h-10 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:border-white/15 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RotateCcw className="w-4 h-4" />
                    )}
                    Regenerate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
}
