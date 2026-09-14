"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckCircle2, PlayCircle, Lock, Play } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const SidebarLessonItem = ({ courseId, lesson, module }) => {
  const searchParams = useSearchParams();
  const activeSlug = searchParams?.get("name");
  const isActive = activeSlug === lesson.slug;
  const isComplete = lesson?.state === "completed";
  const isUnlocked = lesson?.isUnlocked !== false;

  if (!isUnlocked) {
    return (
      <div
        className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-900/30 opacity-60 cursor-not-allowed select-none transition-colors border border-transparent"
        title="Complete the previous lesson to unlock this lesson"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <Lock className="w-4 h-4 flex-shrink-0 text-slate-400 dark:text-slate-600" />
          <span className="truncate">{lesson.title}</span>
        </div>
        <span className="text-[10px] font-mono flex-shrink-0 flex items-center gap-1 text-slate-400 dark:text-slate-600">
          <span>Locked</span>
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/courses/${courseId}/lesson?name=${lesson.slug}&module=${module}`}
      className={cn(
        "flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 group cursor-pointer",
        isActive
          ? "bg-[#4A3AFF] text-white shadow-md shadow-indigo-500/20"
          : isComplete
          ? "bg-emerald-50/70 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-100/70"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {isComplete ? (
          <CheckCircle2
            className={cn(
              "w-4 h-4 flex-shrink-0 text-emerald-500",
              isActive && "text-white"
            )}
          />
        ) : isActive ? (
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Play className="w-2.5 h-2.5 fill-white text-white" />
          </div>
        ) : (
          <PlayCircle className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-[#4A3AFF] transition-colors" />
        )}

        <span className="truncate">{lesson.title}</span>
      </div>

      {lesson.duration && (
        <span
          className={cn(
            "text-[10px] font-mono font-medium flex-shrink-0",
            isActive
              ? "text-indigo-200"
              : isComplete
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-slate-400"
          )}
        >
          {Math.round(lesson.duration / 60)}m
        </span>
      )}
    </Link>
  );
};

