import { Video, Clock, BookOpen } from "lucide-react";
import CourseLessonList from "./CourseLessonList";

const CourseModuleList = ({ module }) => {
  const lessonList = module?.lessonIds || [];
  const totalDuration = lessonList.reduce((acc, obj) => acc + (obj?.duration || 0), 0);
  const formattedDuration = totalDuration > 0 ? `${Math.round(totalDuration / 60)} Mins` : "Self-paced";

  return (
    <div className="pt-2 pb-1 space-y-3">
      {/* Module description and duration badge */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 text-xs font-medium text-slate-500 border-b border-slate-100">
        {module?.description && (
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
            {module.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[#4A3AFF]" />
            <span>{lessonList.length} Lessons</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#4A3AFF]" />
            <span>{formattedDuration}</span>
          </span>
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-2 pt-1">
        {lessonList.map((lessonId) => (
          <CourseLessonList
            key={lessonId?._id?.toString() || lessonId?.id || lessonId}
            lessonId={lessonId}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseModuleList;

