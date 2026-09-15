"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Check, 
  Download, 
  ExternalLink, 
  Share2
} from "lucide-react";

export default function VerifyActions({
  courseId,
  studentId,
  courseTitle,
  credentialId,
  verificationUrl,
  linkedInUrl,
}) {
  const [copied, setCopied] = useState(false);

  const downloadUrl = `/api/certificate?courseId=${courseId || ""}&studentId=${studentId || ""}&credentialId=${credentialId || ""}`;
  const pdfFilename = `EduPlus-Certificate-${credentialId || "verified"}.pdf`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(verificationUrl);
      setCopied(true);
      toast.success("Verification link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  const handlePdfClick = () => {
    toast.info("Downloading official verified PDF certificate...");
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
      
      {/* 1. Add to LinkedIn Button */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs sm:text-sm font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.32a1.65 1.65 0 0 0-1.66 1.64 1.66 1.66 0 1 0 3.31 0 1.65 1.65 0 0 0-1.65-1.64Z" />
        </svg>
        <span>Add to LinkedIn Profile</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
      </a>

      {/* 2. Download Official PDF Button (Native HTTP Download with exact .pdf filename) */}
      <a
        href={downloadUrl}
        download={pdfFilename}
        onClick={handlePdfClick}
        className="inline-flex items-center justify-center gap-2 bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        <Download className="w-4 h-4" />
        <span>Download Official PDF</span>
      </a>

      {/* 3. Copy Verification Link Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleCopyLink}
        className="text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-2"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>Share Link</span>
          </>
        )}
      </Button>

    </div>
  );
}
