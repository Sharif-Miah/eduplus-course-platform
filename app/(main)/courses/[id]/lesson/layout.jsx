import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { CourseSidebar } from "./_components/course-sidebar";
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
      <div className="bg-slate-950 text-white border-b border-slate-800/80 sticky top-20 z-30 px-4 sm:px-6 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
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

      {/* Main Classroom Workspace Grid */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        
        {/* Left: Sticky Desktop Sidebar (380px) */}
        <aside className="hidden lg:block w-96 flex-shrink-0 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0b1120] min-h-[calc(100vh-130px)] sticky top-[133px] max-h-[calc(100vh-133px)] overflow-y-auto transition-colors">
          <CourseSidebar courseId={id} />
        </aside>

        {/* Right: Main Video & Interactive Lesson Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>

      </div>
    </div>
  );
};

export default CourseLayout;
