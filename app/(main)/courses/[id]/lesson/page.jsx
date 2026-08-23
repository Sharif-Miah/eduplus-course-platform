import { Button } from "@/components/ui/button";
import { getCourseDetails } from "@/queries/courses";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { getLessonBySlug } from "@/queries/lessons";
import { LessonVideo } from "./_components/lesson-video";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  Clock
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

  const modulesArray = course?.modules || [];
  const allModules = [...replaceMongoIdInArray(modulesArray)].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Flatten all lessons with their module slug for seamless Next/Prev navigation
  const allLessonsFlat = allModules.flatMap((m) =>
    (m.lessonIds || []).map((l) => ({
      ...l,
      moduleSlug: m.slug,
      moduleTitle: m.title,
    }))
  );

  const defaultLesson = allLessonsFlat[0] ? replaceMongoIdInObject(allLessonsFlat[0]) : null;
  const currentLessonData = name ? await getLessonBySlug(name) : defaultLesson;
  const lessonToPlay = currentLessonData ? replaceMongoIdInObject(currentLessonData) : null;
  const currentModuleSlug = selectedModule ?? (allModules[0]?.slug || "");

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
  const currentIndex = allLessonsFlat.findIndex(
    (l) => (l.slug === lessonToPlay.slug) || (l.id === lessonToPlay.id) || (l._id?.toString() === lessonToPlay.id)
  );

  const prevLesson = currentIndex > 0 ? allLessonsFlat[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessonsFlat.length - 1 ? allLessonsFlat[currentIndex + 1] : null;

  // Find module title
  const currentModuleObj = allModules.find((m) => m.slug === currentModuleSlug) || allModules[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* 1. CINEMA VIDEO PLAYER CONTAINER */}
      <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 ring-1 ring-slate-200/80 dark:ring-slate-700 relative">
        <LessonVideo courseId={id} lesson={lessonToPlay} module={currentModuleSlug} />
      </div>

      {/* 2. LESSON TITLE, MODULE BADGE & NEXT/PREV ACTION BAR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100/90 dark:border-slate-800 space-y-5 transition-colors">
        
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

            {nextLesson ? (
              <Link
                href={`/courses/${id}/lesson?name=${nextLesson.slug}&module=${nextLesson.moduleSlug}`}
                className="inline-flex items-center gap-1.5 bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-2xl shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>All Lessons Done!</span>
              </span>
            )}
          </div>

        </div>

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
