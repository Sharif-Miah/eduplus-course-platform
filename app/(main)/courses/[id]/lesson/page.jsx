import { Button } from "@/components/ui/button";
import { getCourseDetails } from "@/queries/courses";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { getLessonBySlug } from "@/queries/lessons";
import { LessonVideo } from "./_components/lesson-video";
import { DownloadCertificate } from "./_components/download-certificate";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { 
  PlayCircle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  FileText, 
  Sparkles,
  Layers,
  HelpCircle,
  Clock,
  Lock,
  Award
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

const Course = async ({ params, searchParams }) => {
  const id = params?.id;
  const name = searchParams?.name;
  const selectedModule = searchParams?.module;

  const course = await getCourseDetails(id);

  if (!course) {
    notFound();
  }

  const loggedinUser = await getLoggedInUser();

  const modulesArray = course?.modules || [];
  const allModules = [...replaceMongoIdInArray(modulesArray)].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Flatten all lessons with their module slug for sequential navigation
  const allLessonsFlat = allModules.flatMap((m) =>
    (m.lessonIds || []).sort((a, b) => (a.order || 0) - (b.order || 0)).map((l) => ({
      ...l,
      moduleSlug: m.slug,
      moduleTitle: m.title,
    }))
  );

  // Fetch all completed watches for this user
  const completedWatches = loggedinUser?.id
    ? await Watch.find({ user: loggedinUser.id, state: "completed" }).lean()
    : [];
  const completedLessonIds = new Set(completedWatches.map((w) => w.lesson?.toString()));

  // Mark completed state on flat lessons
  allLessonsFlat.forEach((l) => {
    const lId = l.id || l._id?.toString();
    if (completedLessonIds.has(lId)) {
      l.state = "completed";
    }
  });

  // Calculate sequential unlock: only lessons up to lastCompletedIndex + 1 are accessible
  let lastCompletedIndex = -1;
  for (let i = 0; i < allLessonsFlat.length; i++) {
    if (allLessonsFlat[i].state === "completed") {
      lastCompletedIndex = i;
    }
  }

  const maxUnlockedIndex = Math.max(0, lastCompletedIndex + 1);

  // Check requested index
  let requestedIndex = allLessonsFlat.findIndex(
    (l) => (l.slug === name) || (l.id === name) || (l._id?.toString() === name)
  );
  if (requestedIndex === -1) {
    requestedIndex = 0;
  }

  // If user tries to access a locked lesson, play the latest unlocked lesson
  const activeIndex = requestedIndex <= maxUnlockedIndex ? requestedIndex : maxUnlockedIndex;
  const lessonToPlay = allLessonsFlat[activeIndex] ? replaceMongoIdInObject(allLessonsFlat[activeIndex]) : null;
  const currentModuleSlug = selectedModule ?? (allLessonsFlat[activeIndex]?.moduleSlug || allModules[0]?.slug || "");

  const totalLessons = allLessonsFlat.length;
  const totalCompletedLessons = allLessonsFlat.filter((l) => l.state === "completed").length;
  const isCourseFullyCompleted = totalLessons > 0 && totalCompletedLessons === totalLessons;

  if (!lessonToPlay) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 my-8 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950 text-[#4A3AFF] flex items-center justify-center">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Lessons Found</h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          This course currently has no active lessons or the selected lesson could not be loaded.
        </p>
      </div>
    );
  }

  // Calculate Next & Prev Lesson
  const prevLesson = activeIndex > 0 ? allLessonsFlat[activeIndex - 1] : null;
  const nextLessonCandidate = activeIndex < allLessonsFlat.length - 1 ? allLessonsFlat[activeIndex + 1] : null;
  const isNextUnlocked = (activeIndex + 1) <= maxUnlockedIndex;

  // Find module title
  const currentModuleObj = allModules.find((m) => m.slug === currentModuleSlug) || allModules[0];

  return (
    <div className="space-y-4 w-full mx-auto">
      
      {/* 1. CINEMA VIDEO PLAYER CARD (Matching Reference Image 2) */}
      <div className="bg-white dark:bg-[#0c101d] rounded-3xl overflow-hidden shadow-lg dark:shadow-2xl border border-slate-200/80 dark:border-slate-800/90 relative p-3 sm:p-4 space-y-3.5 transition-colors duration-200">
        
        {/* The Video Layer (Balanced cinema scale) */}
        <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-inner">
          <LessonVideo courseId={id} lesson={lessonToPlay} module={currentModuleSlug} />
        </div>

        {/* NOW STREAMING & LESSON TITLE (Matching Reference Image 2) */}
        <div className="px-2 pt-1 pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 dark:text-amber-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse" />
                <span>NOW STREAMING</span>
              </span>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-full">
                {currentModuleObj?.title || "Module"}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1 tracking-tight">
              {lessonToPlay?.title || "Lesson Video"}
            </h1>
          </div>

          {/* Previous & Next Navigation Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {prevLesson ? (
              <Link
                href={`/courses/${id}/lesson?name=${prevLesson.slug}&module=${prevLesson.moduleSlug}`}
                className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 text-xs font-bold px-3 py-1.5 rounded-xl opacity-50 cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
            )}

            {nextLessonCandidate ? (
              isNextUnlocked ? (
                <Link
                  href={`/courses/${id}/lesson?name=${nextLessonCandidate.slug}&module=${nextLessonCandidate.moduleSlug}`}
                  className="inline-flex items-center gap-1 bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 text-xs font-bold px-3 py-1.5 rounded-xl opacity-60 cursor-not-allowed border border-slate-200 dark:border-slate-700/60"
                  title="Complete current video to unlock"
                >
                  <Lock className="w-3 h-3" />
                  <span>Next (Locked)</span>
                </button>
              )
            ) : null}
          </div>
        </div>

        {/* Full-width Module Completion Progress Bar (Matching Reference Image 2) */}
        <div className="rounded-2xl bg-slate-50 dark:bg-[#080c16] border border-slate-200/80 dark:border-slate-800/80 px-3.5 py-2.5 space-y-1.5 transition-colors duration-200">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600 dark:text-slate-400 tracking-wider uppercase text-[10px] font-extrabold flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#4A3AFF] dark:text-indigo-400" />
              <span>{totalCompletedLessons} OF {totalLessons} LESSONS COMPLETED</span>
            </span>
            <span className={isCourseFullyCompleted ? "text-emerald-600 dark:text-emerald-400 font-black text-xs" : "text-[#4A3AFF] dark:text-indigo-400 font-black text-xs"}>
              {Math.round((totalCompletedLessons / Math.max(1, totalLessons)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCourseFullyCompleted ? "bg-[#14C88C]" : "bg-gradient-to-r from-[#4A3AFF] to-indigo-400"
              }`}
              style={{ width: `${Math.round((totalCompletedLessons / Math.max(1, totalLessons)) * 100)}%` }}
            />
          </div>
        </div>

      </div>

      {/* 2. LESSON OVERVIEW & TABS */}
      <div className="bg-white dark:bg-[#0c101d] rounded-3xl p-5 sm:p-6 shadow-lg dark:shadow-xl border border-slate-200/80 dark:border-slate-800/90 space-y-4 transition-colors duration-200">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2">
            
            {/* Badges row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#4A3AFF]/10 text-[#4A3AFF] text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{currentModuleObj?.title || "Current Module"}</span>
              </span>

              {lessonToPlay.state === "completed" && (
                <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-100 dark:border-emerald-900/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Completed</span>
                </span>
              )}

              {lessonToPlay.duration && (
                <span className="text-slate-400 dark:text-slate-400 text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{Math.round(lessonToPlay.duration / 60)} mins</span>
                </span>
              )}
            </div>

            {/* Lesson Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lessonToPlay?.title || "Lesson Video"}
            </h1>
          </div>

          {/* Previous & Next Lesson Navigation Buttons */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {prevLesson ? (
              <Link
                href={`/courses/${id}/lesson?name=${prevLesson.slug}&module=${prevLesson.moduleSlug}`}
                className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl opacity-50 cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
            )}

            {nextLessonCandidate ? (
              isNextUnlocked ? (
                <Link
                  href={`/courses/${id}/lesson?name=${nextLessonCandidate.slug}&module=${nextLessonCandidate.moduleSlug}`}
                  className="inline-flex items-center gap-1.5 bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-2xl shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
                >
                  <span>Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/70 text-slate-400 dark:text-slate-500 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl opacity-60 cursor-not-allowed border border-slate-200/60 dark:border-slate-700"
                  title="Watch or complete the current video to unlock Next Lesson"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Next Lesson (Locked)</span>
                </button>
              )
            ) : isCourseFullyCompleted ? (
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All {totalLessons} Lessons Done! (100%)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl border border-amber-200 dark:border-amber-900/60">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>{totalCompletedLessons} of {totalLessons} Lessons Completed</span>
              </span>
            )}
          </div>

        </div>

        {/* 3. COURSE COMPLETION & CERTIFICATE DOWNLOAD BANNER */}
        {isCourseFullyCompleted ? (
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border-2 border-emerald-500/30 dark:border-emerald-500/30 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs animate-in fade-in duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/25">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>100% Course Completed</span>
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  Congratulations! You Completed All Lessons
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                  You have successfully completed all {totalLessons} lessons. Your official Certificate of Completion is unlocked and ready for download!
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto flex-shrink-0 min-w-[240px]">
              <DownloadCertificate courseId={id} totalProgress={100} />
            </div>
          </div>
        ) : (
          <div className="bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Official Certificate Locked
                </h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  Complete all {totalLessons} video lessons ({totalCompletedLessons} of {totalLessons} done) to unlock and download your certificate.
                </p>
              </div>
            </div>

            <div className="text-xs font-extrabold text-[#4A3AFF] bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
              {totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0}% Done
            </div>
          </div>
        )}

        {/* 3. INTERACTIVE TABS (Overview, Lesson Notes & Resources) */}
        <Tabs defaultValue="notes" className="w-full pt-1">
          <TabsList className="bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-2xl h-auto mb-6 flex-wrap">
            <TabsTrigger 
              value="notes"
              className="py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-[#4A3AFF] dark:data-[state=active]:text-[#4A3AFF] data-[state=active]:shadow-sm transition-all flex items-center gap-1.5 text-slate-600 dark:text-slate-300"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lesson Notes & Summary</span>
            </TabsTrigger>

            <TabsTrigger 
              value="about-course"
              className="py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-[#4A3AFF] dark:data-[state=active]:text-[#4A3AFF] data-[state=active]:shadow-sm transition-all flex items-center gap-1.5 text-slate-600 dark:text-slate-300"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Course Info</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Lesson Notes */}
          <TabsContent value="notes" className="focus-visible:outline-none space-y-4">
            <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-slate-50/70 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
              {lessonToPlay?.description ? (
                <div dangerouslySetInnerHTML={{ __html: lessonToPlay.description }} />
              ) : (
                <p>
                  Welcome to <strong>{lessonToPlay.title}</strong>. Follow along with the video, test the concepts on your local development machine, and mark the lesson complete when you finish.
                </p>
              )}
            </div>
          </TabsContent>

          {/* Tab 2: Course Info */}
          <TabsContent value="about-course" className="focus-visible:outline-none space-y-3">
            <div className="bg-slate-50/70 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{course.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{course.description}</p>
            </div>
          </TabsContent>

        </Tabs>

      </div>

    </div>
  );
};

export default Course;
