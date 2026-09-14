import { Play, Lock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLesson } from "@/queries/lessons";

const CourseLessonList = async ({ lessonId }) => {
  let lesson = null;
  if (typeof lessonId === "object" && lessonId.title) {
    lesson = lessonId;
  } else {
    try {
      lesson = await getLesson(lessonId);
    } catch (e) {
      console.error("Error fetching lesson:", e);
    }
  }

  const durationMin = lesson?.duration ? `${Math.floor(lesson.duration / 60)}:${(lesson.duration % 60).toString().padStart(2, '0')}` : "08:30";

  return (
    <div className="flex items-center justify-between p-3 sm:p-3.5 bg-slate-50/70 hover:bg-indigo-50/50 rounded-xl border border-slate-100 transition-all duration-200 group">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-white group-hover:bg-[#4A3AFF] group-hover:text-white text-[#4A3AFF] flex items-center justify-center shadow-xs border border-slate-200/60 transition-colors flex-shrink-0">
          <Play className="w-3 h-3 fill-current ml-0.5" />
        </div>
        <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
          {lesson?.title || "Interactive Lecture & Hands-on Coding"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {(lesson?.access === "public" || lesson?.is_free) ? (
          <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
            Preview
          </span>
        ) : (
          <Lock className="w-3.5 h-3.5 text-slate-400" />
        )}
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{durationMin}</span>
        </span>
      </div>
    </div>
  );
};

export default CourseLessonList;
