"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2, Download, RefreshCw, Sparkles } from "lucide-react";
import { CreditsDisplay } from "@/components/credits-display";
import { UserMenu } from "@/components/user-menu";
import { UpgradeModal } from "@/components/upgrade-modal";
import { analytics } from "@/lib/analytics";

const styles = [
  { id: "corporate", name: "Corporate", description: "Clean, professional, Fortune 500" },
  { id: "linkedin", name: "LinkedIn", description: "Friendly, approachable, social" },
  { id: "creative", name: "Creative", description: "Modern, startup, artistic" },
  { id: "executive", name: "Executive", description: "Premium, powerful, C-suite" },
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

  // Sync credits with session
  useEffect(() => {
    if (session?.user?.credits !== undefined) {
      setCredits(session.user.credits);
    }
  }, [session?.user?.credits]);

  // Fetch fresh credits
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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const generate = async () => {
    if (!uploadedImage) return;
    
    // Check credits before attempting generation
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
      
      // Update credits from response
      if (data.remainingCredits !== undefined) {
        setCredits(data.remainingCredits);
      } else {
        // Refresh from server
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
    link.download = "headshotai-professional.png";
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
    <div className="min-h-screen bg-[#08080a] text-white">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="h-4 w-px bg-white/20" />
            <h1 className="font-display text-lg font-semibold">
              Headshot<span className="text-orange-400">AI</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <CreditsDisplay 
              credits={credits} 
              onClick={() => setShowUpgradeModal(true)} 
            />
            {session?.user && <UserMenu user={session.user} />}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className={`flex items-center gap-2 ${uploadedImage ? 'text-orange-400' : 'text-white'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${uploadedImage ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/60'}`}>
              1
            </div>
            <span className="text-sm">Upload</span>
          </div>
          <div className="w-12 h-px bg-white/20" />
          <div className={`flex items-center gap-2 ${generatedImage ? 'text-orange-400' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${generatedImage ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/60'}`}>
              2
            </div>
            <span className="text-sm">Generate</span>
          </div>
          <div className="w-12 h-px bg-white/20" />
          <div className={`flex items-center gap-2 ${generatedImage ? 'text-orange-400' : 'text-white/40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${generatedImage ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/60'}`}>
              3
            </div>
            <span className="text-sm">Download</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Your Photo</h2>
            {!uploadedImage ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isDragging ? 'border-orange-500 bg-orange-500/10' : 'border-white/20 hover:border-white/40 bg-white/[0.02]'
                }`}
              >
                <Upload className="w-12 h-12 text-white/40 mb-4" />
                <p className="text-white/60 text-center px-8">
                  Drop your selfie here
                  <br />
                  <span className="text-orange-400">or click to browse</span>
                </p>
                <p className="text-white/30 text-sm mt-4">JPG, PNG up to 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  onClick={reset} 
                  className="w-full py-3 px-4 rounded-xl border border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Upload Different Photo
                </button>
              </div>
            )}
          </div>

          {/* Style Selection & Generation */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Choose Style</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedStyle === style.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="font-medium mb-1 text-white">{style.name}</div>
                  <div className="text-xs text-white/50">{style.description}</div>
                </button>
              ))}
            </div>

            {!generatedImage ? (
              <button 
                onClick={generate} 
                disabled={!uploadedImage || isGenerating}
                className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-black font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating your headshot…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Headshot
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Your Professional Headshot</h3>
                <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-orange-500/30">
                  <img 
                    src={generatedImage} 
                    alt="Generated headshot" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={download} 
                    className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download HD
                  </button>
                  <button 
                    onClick={generate} 
                    disabled={isGenerating}
                    className="flex-1 py-3 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    Regenerate
                  </button>
                </div>
              </div>
            )}

            {uploadedImage && !generatedImage && (
              <p className="text-center text-white/40 text-sm mt-4">
                {credits > 0 
                  ? `You have ${credits} credit${credits !== 1 ? "s" : ""} remaining`
                  : "You need credits to generate headshots"}
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Upgrade Modal */}
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />

      <style jsx global>{`
        .font-display {
          font-family: var(--font-display), system-ui, sans-serif;
        }
      `}</style>
    </div>
  );
}
