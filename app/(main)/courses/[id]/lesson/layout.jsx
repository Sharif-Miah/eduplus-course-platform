import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { CourseSidebar } from "./_components/course-sidebar";
import { LessonAiSidebar } from "./_components/lesson-ai-sidebar";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { redirect } from "next/navigation";
import { hasEnrollmentForCourse } from "@/queries/enrollments";
import { getCourseDetails } from "@/queries/courses";
import Link from "next/link";
import { ArrowLeft, ChevronRight, BookOpen, GraduationCap } from "lucide-react";

export const dynamic = "force-dynamic";

const CourseLayout = async ({ children, params }) => {
  const id = params?.id;
  const loggedinUser = await getLoggedInUser();
  if (!loggedinUser) {
    redirect("/login");
  }

  const isEnrolled = await hasEnrollmentForCourse(id, loggedinUser.id);
  if (!isEnrolled) {
    redirect(`/courses/${id}`);
  }

  const course = await getCourseDetails(id);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0b1120] flex flex-col transition-colors duration-200">
      {/* Top Sticky Learning Sub-Header */}
      <div className="bg-slate-950 text-white border-b border-slate-800/80 sticky top-20 z-30 px-3 sm:px-5 py-3 shadow-xs">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back Link & Breadcrumbs */}
          <div className="flex items-center gap-3 overflow-hidden">
            <Link
              href={`/courses/${id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 px-3 py-1.5 rounded-full border border-slate-700/70 transition flex-shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Course Overview</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400 truncate">
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              <span className="text-white font-bold truncate max-w-sm">
                {course?.title || "Learning Classroom"}
              </span>
            </div>
          </div>

          {/* Right: Mobile Sidebar Trigger & Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 bg-[#4A3AFF]/20 text-[#4A3AFF] border border-[#4A3AFF]/40 px-3 py-1 rounded-full text-xs font-extrabold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Interactive Classroom</span>
            </div>

            {/* Mobile Sidebar Sheet Trigger */}
            <div className="lg:hidden">
              <CourseSidebarMobile>
                <CourseSidebar courseId={id} />
              </CourseSidebarMobile>
            </div>
          </div>

        </div>
      </div>

      {/* Main Classroom 3-Column Card Layout: Separated rounded cards with generous bottom padding */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1720px] w-full mx-auto gap-4 xl:gap-5 p-3 sm:p-5 lg:p-6 pb-24 lg:pb-32 items-start justify-center">
        
        {/* 1. Left: Curved Curriculum Card (~290px - 300px) */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-[295px] flex-shrink-0 rounded-3xl border border-slate-200/80 dark:border-slate-800/90 bg-white dark:bg-[#0c101d] shadow-2xl overflow-hidden sticky top-[133px] h-[calc(100vh-170px)] min-h-[620px] max-h-[820px] transition-all">
          <CourseSidebar courseId={id} />
        </aside>

        {/* 2. Middle: Balanced Video Player & Lesson Details (Max ~820px - 840px) */}
        <main className="flex-1 min-w-0 max-w-[800px] xl:max-w-[840px] w-full">
          {children}
        </main>

        {/* 3. Right: Wider Embedded AI Chat Card (~380px - 410px) */}
        <LessonAiSidebar courseTitle={course?.title || "Course"} />

      </div>
    </div>
  );
};

export default CourseLayout;
