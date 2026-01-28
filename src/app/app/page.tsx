"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2, Download, RefreshCw, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics";

const styles = [
  { id: "corporate", name: "Corporate", description: "Clean, professional, Fortune 500" },
  { id: "linkedin", name: "LinkedIn", description: "Friendly, approachable, social" },
  { id: "creative", name: "Creative", description: "Modern, startup, artistic" },
  { id: "executive", name: "Executive", description: "Premium, powerful, C-suite" },
];

export default function HeadshotApp() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("corporate");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    analytics.appView();
  }, []);

  const handleFile = useCallback((file: File) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    if (!file.type.startsWith("image/") && !validTypes.some(t => file.type === t)) {
      setError("Please upload an image file (JPG, PNG, or WebP)");
      return;
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB. Try compressing it first.");
      return;
    }
    
    setError(null);
    analytics.imageUpload();
    
    const reader = new FileReader();
    reader.onerror = () => {
      setError("Failed to read the image file. Please try again.");
    };
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
    
    setIsGenerating(true);
    setError(null);
    analytics.generateStart();
    analytics.styleSelect(selectedStyle);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout
      
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: uploadedImage, style: selectedStyle }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Generation failed. Please try again.");
      }
      
      if (!data.image) {
        throw new Error("No image received. Please try again.");
      }
      
      setGeneratedImage(data.image);
      analytics.generateComplete();
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again with a smaller image.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const download = () => {
    if (!generatedImage) return;
    analytics.downloadClick();
    
    try {
      const link = document.createElement("a");
      link.download = `headshotai-${selectedStyle}-${Date.now()}.png`;
      link.href = generatedImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setError("Failed to download. Try right-clicking the image and saving it.");
    }
  };

  const reset = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white">
      {/* Skip link */}
      <a
        href="#upload-section"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-black focus:rounded-lg focus:font-semibold"
      >
        Skip to upload
      </a>

      {/* Header */}
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            aria-label="Back to home page"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back
          </Link>
          <div className="h-4 w-px bg-white/20" aria-hidden="true" />
          <Link href="/" className="font-display text-lg font-semibold">
            Headshot<span className="text-orange-400">AI</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Step indicator */}
        <nav aria-label="Progress" className="flex items-center justify-center gap-4 mb-10">
          <div className={`flex items-center gap-2 ${uploadedImage ? 'text-orange-400' : 'text-white'}`}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${uploadedImage ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/60'}`}
              aria-current={!uploadedImage ? "step" : undefined}
            >
              1
            </div>
            <span className="text-sm">Upload</span>
          </div>
          <div className="w-12 h-px bg-white/20" aria-hidden="true" />
          <div className={`flex items-center gap-2 ${generatedImage ? 'text-orange-400' : 'text-white/40'}`}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${generatedImage ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/60'}`}
              aria-current={uploadedImage && !generatedImage ? "step" : undefined}
            >
              2
            </div>
            <span className="text-sm">Generate</span>
          </div>
          <div className="w-12 h-px bg-white/20" aria-hidden="true" />
          <div className={`flex items-center gap-2 ${generatedImage ? 'text-orange-400' : 'text-white/40'}`}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${generatedImage ? 'bg-orange-500 text-black' : 'bg-white/10 text-white/60'}`}
              aria-current={generatedImage ? "step" : undefined}
            >
              3
            </div>
            <span className="text-sm">Download</span>
          </div>
        </nav>

        {/* Error message */}
        {error && (
          <div 
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-red-400/80">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <section id="upload-section" aria-labelledby="upload-heading">
            <h2 id="upload-heading" className="text-lg font-semibold mb-4 text-white">Your Photo</h2>
            {!uploadedImage ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload your photo. Click or drag and drop an image file."
                className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isDragging ? 'border-orange-500 bg-orange-500/10' : 'border-white/20 hover:border-white/40 bg-white/[0.02]'
                }`}
              >
                <Upload className="w-12 h-12 text-white/40 mb-4" aria-hidden="true" />
                <p className="text-white/60 text-center px-8">
                  Drop your selfie here
                  <br />
                  <span className="text-orange-400">or click to browse</span>
                </p>
                <p className="text-white/30 text-sm mt-4">JPG, PNG up to 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                  aria-label="Choose image file"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <figure className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <img 
                    src={uploadedImage} 
                    alt="Your uploaded photo for headshot generation" 
                    className="w-full h-full object-cover"
                  />
                </figure>
                <button 
                  onClick={reset} 
                  className="w-full py-3 px-4 rounded-xl border border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <RefreshCw className="w-4 h-4" aria-hidden="true" />
                  Upload Different Photo
                </button>
              </div>
            )}
          </section>

          {/* Style Selection & Generation */}
          <section aria-labelledby="style-heading">
            <h2 id="style-heading" className="text-lg font-semibold mb-4 text-white">Choose Style</h2>
            <fieldset className="grid grid-cols-2 gap-3 mb-6">
              <legend className="sr-only">Select headshot style</legend>
              {styles.map((style) => (
                <label
                  key={style.id}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedStyle === style.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="style"
                    value={style.id}
                    checked={selectedStyle === style.id}
                    onChange={() => setSelectedStyle(style.id)}
                    className="sr-only"
                  />
                  <div className="font-medium mb-1 text-white">{style.name}</div>
                  <div className="text-xs text-white/50">{style.description}</div>
                </label>
              ))}
            </fieldset>

            {!generatedImage ? (
              <button 
                onClick={generate} 
                disabled={!uploadedImage || isGenerating}
                aria-busy={isGenerating}
                className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-black font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>Generating your headshot…</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                    <span>Generate Headshot</span>
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Your Professional Headshot</h3>
                <figure className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-orange-500/30">
                  <img 
                    src={generatedImage} 
                    alt={`Your AI-generated ${selectedStyle} professional headshot`}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="flex gap-3">
                  <button 
                    onClick={download} 
                    className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Download HD
                  </button>
                  <button 
                    onClick={generate}
                    disabled={isGenerating}
                    aria-busy={isGenerating}
                    className="flex-1 py-3 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <RefreshCw className="w-4 h-4" aria-hidden="true" />
                    )}
                    Regenerate
                  </button>
                </div>
              </div>
            )}

            {uploadedImage && !generatedImage && (
              <p className="text-center text-white/40 text-sm mt-4">
                First generation free • Then $5 per headshot
              </p>
            )}
          </section>
        </div>
      </main>

      <style jsx global>{`
        .font-display {
          font-family: var(--font-display), system-ui, sans-serif;
        }
      `}</style>
    </div>
  );
}
