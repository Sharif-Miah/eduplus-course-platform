"use client";

import ReactPlayer from "react-player/youtube";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlayCircle, Loader2, CheckCircle2, Award, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const LessonVideo = ({ courseId, lesson, module }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [isMarking, setIsMarking] = useState(false);
  const [duration, setDuration] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    async function updateLessonWatch() {
      try {
        const response = await fetch("/api/lesson-watch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: courseId,
            lessonId: lesson.id,
            moduleSlug: module,
            state: "started",
            lastTime: 0,
          }),
        });

        if (response.status === 200) {
          setStarted(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (started && lesson?.id) {
      updateLessonWatch();
    }
  }, [started, courseId, lesson?.id, module]);

  useEffect(() => {
    async function updateLessonWatch() {
      try {
        const response = await fetch("/api/lesson-watch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: courseId,
            lessonId: lesson.id,
            moduleSlug: module,
            state: "completed",
            lastTime: duration,
          }),
        });

        if (response.status === 200) {
          setEnded(false);
          toast.success("Video finished! Next lesson is now unlocked.");
          router.refresh();
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (ended && lesson?.id) {
      updateLessonWatch();
    }
  }, [ended, courseId, lesson?.id, module, duration, router]);

  async function handleMarkCompleted() {
    try {
      setIsMarking(true);
      const response = await fetch("/api/lesson-watch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseId,
          lessonId: lesson.id,
          moduleSlug: module,
          state: "completed",
          lastTime: duration || 100,
        }),
      });

      if (response.status === 200) {
        toast.success("Lesson marked completed! Next lesson unlocked.");
        router.refresh();
      } else {
        toast.error("Failed to mark lesson completed.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error updating lesson progress.");
    } finally {
      setIsMarking(false);
    }
  }

  function handleOnStart() {
    setStarted(true);
  }

  function handleOnEnded() {
    setEnded(true);
  }

  function handleOnDuration(durationSec) {
    setDuration(durationSec);
  }

  const isCompleted = lesson?.state === "completed";
  const videoUrl = lesson?.video_url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <div className="space-y-3">
      {/* 1. Cinema Video Player */}
      <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl shadow-inner">
        {hasWindow ? (
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls={true}
            playing={false}
            onStart={handleOnStart}
            onDuration={handleOnDuration}
            onEnded={handleOnEnded}
            config={{
              youtube: {
                playerVars: { showinfo: 1, autoplay: 0 },
              },
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#4A3AFF]" />
            <span className="text-xs font-semibold">Loading Classroom Player...</span>
          </div>
        )}
      </div>

      {/* 2. Interactive Video Progress Control Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 px-2 py-1">
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Lesson Completed</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              <PlayCircle className="w-4 h-4 text-[#4A3AFF]" />
              <span>In Progress (Watch or mark done to unlock next)</span>
            </span>
          )}
        </div>

        <div>
          {isCompleted ? (
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Next lesson is unlocked</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleMarkCompleted}
              disabled={isMarking}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-60"
            >
              {isMarking ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              <span>Complete & Unlock Next Lesson</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};