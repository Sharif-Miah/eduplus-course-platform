"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Award, Download, Loader2, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const DownloadCertificate = ({ courseId, totalProgress }) => {
  const [isCertificateDownloading, setIsCertificateDownloading] = useState(false);
  const isUnlocked = Number(totalProgress) >= 100;

  async function handleCertificateDownload() {
    if (!isUnlocked) {
      toast.info("Please complete all lessons (100% required) to unlock your certificate.");
      return;
    }

    try {
      setIsCertificateDownloading(true);
      const response = await fetch(`/api/certificate?courseId=${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to generate certificate.");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Course_Certificate.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Your certificate has been downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to download certificate.");
    } finally {
      setIsCertificateDownloading(false);
    }
  }

  return (
    <button
      onClick={handleCertificateDownload}
      disabled={isCertificateDownloading}
      className={cn(
        "w-full rounded-2xl py-3 px-4 text-xs font-bold transition-all duration-200 flex items-center justify-between shadow-xs cursor-pointer",
        isUnlocked
          ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
          : "bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700"
      )}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
            isUnlocked ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-300"
          )}
        >
          {isCertificateDownloading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isUnlocked ? (
            <Award className="w-4 h-4" />
          ) : (
            <Lock className="w-3.5 h-3.5" />
          )}
        </div>
        <span className="truncate">
          {isUnlocked ? "Download Official Certificate" : "Certificate Locked (100% required)"}
        </span>
      </div>

      {isUnlocked && (
        <Download className="w-4 h-4 text-white flex-shrink-0" />
      )}
    </button>
  );
};
