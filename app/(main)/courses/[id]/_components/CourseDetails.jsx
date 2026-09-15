import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMyDate } from "@/lib/date";
import { getImageUrl } from "@/lib/utils";
import { EnrollCourse } from "@/components/enroll-course";
import { hasEnrollmentForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { auth } from "@/auth";

import CourseOverview from "./CourseOverview";
import CourseCurriculam from "./CourseCurriculam";
import CourseInstructor from "./CourseInstructor";
import Testimonials from "./Testimonials";

import Image from "next/image";
import Link from "next/link";
import { 
  Play, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  FileText, 
  Award, 
  HelpCircle, 
  Share2, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  ArrowRight,
  Video,
  Flame,
  Lock,
  MessageSquareQuote,
  ListOrdered,
  UserCheck
} from "lucide-react";

const CourseDetails = async ({ course }) => {
  const session = await auth();
  const loggedInUser = session?.user?.email ? await getUserByEmail(session.user.email) : null;
  const hasEnrollment = loggedInUser?.id ? await hasEnrollmentForCourse(course?.id, loggedInUser.id) : false;

  const totalLessons = course?.modules?.reduce((acc, m) => acc + (m.lessonIds?.length || 0), 0) || (course?.modules?.length ? course.modules.length * 8 : 24);
  const rawPrice = course?.price !== undefined && course?.price !== null ? course.price : 99;
  const formattedPrice = typeof rawPrice === "number" ? rawPrice.toFixed(2) : rawPrice;
  const originalPrice = (typeof rawPrice === "number" ? rawPrice * 1.4 : 140).toFixed(2);
  const savings = (parseFloat(originalPrice) - parseFloat(formattedPrice)).toFixed(2);

  return (
    <section className="py-14 lg:py-20 bg-[#F8FAFC] relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Media Preview & Rich Tabs (lg:col-span-8) */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Large Course Thumbnail Banner with Video Play Overlay */}
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-4 border-white group">
              <Image
                src={getImageUrl(course?.thumbnail, "courses")}
                alt={course?.title || "Course Thumbnail"}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Top-to-Bottom Sliding Dark Hover Overlay */}
              <div className="absolute inset-0 bg-black/45 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 pointer-events-none" />

              {/* Floating Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#4A3AFF] shadow-2xl flex items-center justify-center group-hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer">
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-60 pointer-events-none" />
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-[#4A3AFF] ml-1" />
                </div>
              </div>

              {/* Top Video Quality Badge */}
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 z-20">
                <Video className="w-3.5 h-3.5 text-[#14C88C]" />
                <span>4K Ultra HD • Sample Video</span>
              </div>

              {/* Bottom Info Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-4 sm:px-5 py-3 rounded-2xl border border-white/10 text-xs font-semibold text-white z-20">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#14C88C] animate-pulse" />
                  Free Interactive Preview Lessons Included
                </span>
                <span className="text-slate-300 font-bold">{totalLessons} Comprehensive Lessons</span>
              </div>
            </div>

            {/* 2. Interactive Modern Navigation Tabs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100/90">
              <Tabs defaultValue="overview" className="w-full">
                
                {/* Tabs Header Navigation */}
                <TabsList className="grid w-full grid-cols-4 bg-slate-100/80 p-1.5 rounded-2xl h-auto mb-8">
                  <TabsTrigger 
                    value="overview" 
                    className="py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm data-[state=active]:bg-[#4A3AFF] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Overview</span>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="curriculum" 
                    className="py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm data-[state=active]:bg-[#4A3AFF] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ListOrdered className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Curriculum</span>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="instructor" 
                    className="py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm data-[state=active]:bg-[#4A3AFF] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Instructor</span>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="reviews" 
                    className="py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm data-[state=active]:bg-[#4A3AFF] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquareQuote className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Reviews</span>
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Overview */}
                <TabsContent value="overview" className="space-y-6 focus-visible:outline-none">
                  <CourseOverview course={course} />
                </TabsContent>

                {/* Tab 2: Curriculum */}
                <TabsContent value="curriculum" className="space-y-6 focus-visible:outline-none">
                  <CourseCurriculam course={course} />
                </TabsContent>

                {/* Tab 3: Instructor */}
                <TabsContent value="instructor" className="space-y-6 focus-visible:outline-none">
                  <CourseInstructor course={course} />
                </TabsContent>

                {/* Tab 4: Reviews */}
                <TabsContent value="reviews" className="space-y-6 focus-visible:outline-none">
                  {course?.testimonials && course.testimonials.length > 0 ? (
                    <Testimonials testimonials={course.testimonials} />
                  ) : (
                    <div className="text-center py-14 bg-slate-50/70 rounded-2xl border border-slate-100 text-slate-500">
                      <p className="font-semibold text-sm">No student reviews submitted yet for this course.</p>
                    </div>
                  )}
                </TabsContent>

              </Tabs>
            </div>

          </div>


          {/* ======================================================== */}
          {/* RIGHT COLUMN: Sticky Pricing & Enrollment Card (lg:col-span-4) */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 sticky top-24 z-30">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-900 space-y-6 relative overflow-hidden">
              
              {/* Top Gradient Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-[#4A3AFF] via-[#6C5CE7] to-[#14C88C]" />

              {/* Urgency Promo Badge */}
              <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 font-bold text-xs px-3 py-1 rounded-full border border-rose-200">
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-bounce" />
                <span>Limited Time Offer • Save ${savings}</span>
              </div>

              {/* Pricing Display */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black text-[#4A3AFF] tracking-tight">
                    ${formattedPrice}
                  </span>
                  <span className="text-lg text-slate-400 line-through font-semibold">
                    ${originalPrice}
                  </span>
                  <span className="bg-emerald-50 text-emerald-600 font-extrabold text-xs px-2.5 py-1 rounded-full border border-emerald-200">
                    28% OFF
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium pt-1">
                  One-time payment • Lifetime access to all future updates
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-3 pt-2">
                {hasEnrollment ? (
                  <Link
                    href={`/courses/${course?.id}/lesson`}
                    className="w-full bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white font-extrabold py-4 px-6 rounded-2xl shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all text-sm group"
                  >
                    <span>Access Course Content</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <div className="w-full">
                    <EnrollCourse 
                      courseId={course?.id} 
                      coursePrice={rawPrice} 
                      courseTitle={course?.title} 
                    />
                  </div>
                )}

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-600 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#14C88C]" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Course Includes Feature List */}
              <div className="space-y-3.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                  This Course Includes:
                </h4>
                
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium">
                  <li className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#4A3AFF] flex-shrink-0" />
                    <span>Full Lifetime Access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-[#4A3AFF] flex-shrink-0" />
                    <span>{totalLessons} Guided Lessons & Modules</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-[#4A3AFF] flex-shrink-0" />
                    <span>Access on Mobile, Tablet & Desktop</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#4A3AFF] flex-shrink-0" />
                    <span>Downloadable Resource Files</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-[#4A3AFF] flex-shrink-0" />
                    <span>Verified Certificate of Completion</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#4A3AFF] flex-shrink-0" />
                    <span>Dedicated Instructor Q&A Support</span>
                  </li>
                </ul>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Share & Accreditation Badge */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-1">
                <span className="flex items-center gap-1.5 text-[#4A3AFF]">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Course</span>
                </span>
                <span className="text-slate-400">EduPlus Accredited</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CourseDetails;
