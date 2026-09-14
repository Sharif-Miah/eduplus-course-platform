
import { CourseProgress } from "@/components/course-progress";
import Link from "next/link";
import { GiveReview } from "./give-review";
import { DownloadCertificate } from "./download-certificate";
import { SidebarModules } from "./sidebar-modules";
import { getCourseDetails } from "@/queries/courses";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { getAReport } from "@/queries/reports";
import { Quiz } from "./quiz";
import { Sparkles, BookOpen, Award, CheckCircle2 } from "lucide-react";

export const CourseSidebar = async ({ courseId }) => {
  const course = await getCourseDetails(courseId);
  if (!course) return null;

  const loggedinUser = await getLoggedInUser();
  const report = await getAReport({ course: courseId, student: loggedinUser?.id });
  // Fetch all completed watches for this user in one single efficient query
  const completedWatches = loggedinUser?.id
    ? await Watch.find({ user: loggedinUser.id, state: "completed" }).lean()
    : [];
  const completedLessonIds = new Set(
    completedWatches.map((w) => w.lesson?.toString())
  );

  const updatedModules = (course?.modules || []).map((module) => {
    const lessons = module?.lessonIds || [];
    lessons.forEach((lesson) => {
      const lessonId = lesson._id ? lesson._id.toString() : lesson.id;
      if (completedLessonIds.has(lessonId)) {
        lesson.state = "completed";
      }
    });
    return module;
  });

  // 1. Sort modules and flatten lessons in sequential order
  const sortedModules = [...(updatedModules || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  const allFlatLessons = sortedModules.flatMap((m) =>
    (m.lessonIds || []).sort((a, b) => (a.order || 0) - (b.order || 0))
  );

  // 2. Sequential unlock: find index of last completed lesson
  let lastCompletedIndex = -1;
  for (let i = 0; i < allFlatLessons.length; i++) {
    if (allFlatLessons[i]?.state === "completed") {
      lastCompletedIndex = i;
    }
  }

  // The next available lesson is lastCompletedIndex + 1 (Lesson 1 index 0 is always unlocked)
  const maxUnlockedIndex = Math.max(0, lastCompletedIndex + 1);

  allFlatLessons.forEach((lesson, index) => {
    lesson.isUnlocked = index <= maxUnlockedIndex;
  });

  // 3. Accurate progress calculation
  const totalLessons = allFlatLessons.length;
  const totalCompletedLessons = allFlatLessons.filter((l) => l.state === "completed").length;
  const totalProgress = totalLessons > 0 ? Math.min(100, Math.round((totalCompletedLessons / totalLessons) * 100)) : 0;

  const quizSet = course?.quizSet;
  const isQuizComplete = report?.quizAssessment ? true : false;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0b1120] transition-colors">
      {/* 1. Sidebar Header with Course Title & Progress Bar */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 space-y-4 bg-gradient-to-b from-slate-50/70 dark:from-slate-900/50 to-white dark:to-[#0b1120]">
        <div className="space-y-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#4A3AFF] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum Progress</span>
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
            {course?.title || "Course Curriculum"}
          </h2>
        </div>

        {/* Progress Display */}
        <div className="space-y-2 bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-100 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{totalCompletedLessons} of {totalLessons} Lessons Completed</span>
            </span>
            <span className={totalProgress === 100 ? "text-emerald-600 dark:text-emerald-400 font-black" : "text-[#4A3AFF] font-black"}>
              {totalProgress}%
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                totalProgress === 100 ? "bg-[#14C88C]" : "bg-[#4A3AFF]"
              }`}
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Interactive Modules Accordion List */}
      <div className="flex-1 overflow-y-auto py-2">
        <SidebarModules courseId={courseId} modules={updatedModules} />
      </div>

      {/* 3. Bottom Actions & Special Cards */}
      <div className="p-4 sm:p-4.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
        {quizSet && (
          <div className="w-full">
            <Quiz courseId={courseId} quizSet={quizSet} isTaken={isQuizComplete} />
          </div>
        )}

        <div className="space-y-2">
          <DownloadCertificate courseId={courseId} totalProgress={totalProgress} />
          <GiveReview courseId={courseId} />
        </div>
      </div>
    </div>
  );
};
