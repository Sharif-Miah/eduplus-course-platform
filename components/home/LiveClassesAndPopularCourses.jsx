"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mic, PhoneOff, Video, Star, FileText, Users, ArrowRight } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

export default function LiveClassesAndPopularCourses({ courses = [] }) {
  const [activeCategory, setActiveCategory] = useState("All Courses");

  // Derive category filter tabs dynamically from backend courses
  const categoriesFromData = Array.from(
    new Set(courses.map((c) => c.category?.title).filter(Boolean))
  );
  const filterTabs = [
    "All Courses",
    ...(categoriesFromData.length > 0
      ? categoriesFromData
      : ["Art & Design", "Finance", "Marketing", "Programming"]),
  ];

  // Default fallback courses matching design
  const defaultCourses = [
    {
      id: "course-1",
      title: "Learn Machine Learning Practically with Python",
      category: "Python",
      rating: "4.8",
      reviews: "3",
      lessons: 98,
      students: 54,
      price: "120.00",
      instructor: "Dev. Masum Billah",
      instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      thumbnail: "/assets/home/hero_card_classroom.jpg",
    },
    {
      id: "course-2",
      title: "Enhance Your Personal Financial Analysis Skills",
      category: "Finance",
      rating: "4.8",
      reviews: "3",
      lessons: 75,
      students: 45,
      price: "80.00",
      instructor: "Dev. Masum Billah",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      thumbnail: "/assets/home/course_finance_student.jpg",
    },
    {
      id: "course-3",
      title: "The Ultimate Guide to Building a RESTful API",
      category: "Programming",
      rating: "4.8",
      reviews: "3",
      lessons: 87,
      students: 69,
      price: "130.00",
      instructor: "Dev. Masum Billah",
      instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      thumbnail: "/assets/home/course_female_hoodie.jpg",
    },
    {
      id: "course-4",
      title: "SEO as the Core of Your New Business Venture",
      category: "SEO",
      rating: "4.8",
      reviews: "3",
      lessons: 20,
      students: 125,
      price: "90.00",
      instructor: "Dev. Masum Billah",
      instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      thumbnail: "/assets/home/course_seo_stairs.jpg",
    },
    {
      id: "course-5",
      title: "The complete guide to build application",
      category: "App Development",
      rating: "4.8",
      reviews: "3",
      lessons: 250,
      students: 85,
      price: "150.00",
      instructor: "Dev. Masum Billah",
      instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      thumbnail: "/assets/home/course_team_discussion.jpg",
    },
    {
      id: "course-6",
      title: "Interior design concepts Masterclass",
      category: "Art & Design",
      rating: "4.8",
      reviews: "3",
      lessons: 250,
      students: 100,
      price: "110.00",
      instructor: "Dev. Masum Billah",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      thumbnail: "/assets/home/course_interior_design.jpg",
    },
  ];

  // Map courses from database or fallback
  const mappedCourses = courses.length > 0
    ? courses.map((c, idx) => {
        const fallback = defaultCourses[idx % defaultCourses.length];
        const catTitle = c.category?.title || fallback.category;
        const rawPrice = c.price !== undefined && c.price !== null ? c.price : fallback.price;
        const formattedPrice = typeof rawPrice === "number" 
          ? rawPrice.toFixed(2) 
          : (String(rawPrice).includes(".") ? rawPrice : `${rawPrice}.00`);
        
        let thumbUrl = fallback.thumbnail;
        if (c.thumbnail) {
          thumbUrl = getImageUrl(c.thumbnail, "courses");
        }

        const instructorName = c.instructor 
          ? `${c.instructor.firstName || ""} ${c.instructor.lastName || ""}`.trim()
          : "Dev. Masum Billah";

        const instructorAvatar = c.instructor?.profilePicture || fallback.instructorAvatar;

        return {
          id: c.id || c._id,
          title: c.title || fallback.title,
          category: catTitle,
          rating: "4.8",
          reviews: c.testimonials?.length || (idx % 3 + 2),
          lessons: c.modules?.length ? c.modules.length * 8 : fallback.lessons,
          students: 45 + idx * 15,
          price: formattedPrice,
          instructor: instructorName || "Dev. Masum Billah",
          instructorAvatar: instructorAvatar,
          thumbnail: thumbUrl,
        };
      })
    : defaultCourses;

  // Filter based on active tab
  const filteredCourses = activeCategory === "All Courses"
    ? mappedCourses
    : mappedCourses.filter(c => c.category?.toLowerCase() === activeCategory.toLowerCase());

  const displayList = filteredCourses.length > 0 ? filteredCourses : mappedCourses;

  return (
    <section id="live-classes" className="py-24 bg-slate-50/50 dark:bg-[#0b1120] relative transition-colors duration-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">

        {/* ======================================================== */}
        {/* TOP BANNER: LIVE CLASSES (Image 2 Style) */}
        {/* ======================================================== */}
        <div className="mb-28">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A3AFF] mb-2">
              LIVE CLASSES
            </p>
            <div className="relative inline-block">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                It&apos;s Easy to Start Learning
              </h2>
              {/* Hand-drawn blue wavy underline */}
              <div className="flex justify-center mt-3">
                <svg className="w-32 sm:w-44 text-[#4A3AFF]" viewBox="0 0 144 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10.5C28.5 2 64.5 14 142 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2 Side-by-Side Live Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">

            {/* Left Card: Live Video Screen with Instructor */}
            <div className="lg:col-span-7 relative">
              {/* Green dot grid decor */}
              <div className="absolute -left-6 top-8 -z-0 opacity-40">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-[#14C88C] rounded-full" />
                  ))}
                </div>
              </div>

              <div className="relative aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 z-10">
                <Image
                  src="/assets/home/live_instructor.jpg"
                  alt="Instructor in live lecture"
                  fill
                  unoptimized
                  className="object-cover"
                />

                {/* Live Badge top right */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-400 font-bold">LIVE</span>
                  <span className="text-slate-300">1:50:30</span>
                </div>

                {/* Call Action Controls at bottom */}
                <div className="absolute bottom-5 inset-x-0 flex items-center justify-center gap-3 z-20">
                  <div className="w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-lg cursor-pointer hover:bg-slate-100 transition">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-rose-600 transition">
                    <PhoneOff className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#14C88C] text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-emerald-600 transition">
                    <Video className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Live Class Info & Join CTA */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100/90 dark:border-slate-800 relative transition-colors">
              {/* Decorative wave at top-left */}
              <div className="text-indigo-500 mb-3">
                <svg width="48" height="14" viewBox="0 0 48 14" fill="none">
                  <path d="M1 7C6 2 10 12 15 7C20 2 24 12 29 7C34 2 38 12 43 7C45 5 47 6 48 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full overflow-hidden relative ring-1 ring-slate-200 dark:ring-slate-700">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    alt="Instructor"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Dev. Masum Billah</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                The complete guide to build restful API
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {"★★★★★"}
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">4.8</span>
              </div>

              {/* Online Students Avatars + Join Now Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Online Students
                  </span>
                  <div className="flex items-center -space-x-2">
                    {["https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                    ].map((src, i) => (
                      <div key={i} className="w-7 h-7 rounded-full overflow-hidden relative ring-2 ring-white dark:ring-slate-900">
                        <Image src={src} alt="Student" fill unoptimized className="object-cover" />
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full bg-[#4A3AFF] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm">
                      5k+
                    </div>
                  </div>
                </div>

                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-1.5 border-2 border-[#4A3AFF] text-[#4A3AFF] dark:text-indigo-300 hover:bg-[#4A3AFF] hover:text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>


        {/* ======================================================== */}
        {/* BOTTOM SECTION: MOST POPULAR COURSES (Image 3 Style) */}
        {/* ======================================================== */}
        <div id="popular-courses">
          
          {/* Section Header with Category Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A3AFF] mb-2">
                COURSES
              </p>
              <div className="relative inline-block">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Most Popular Courses
                </h2>
                {/* Hand-drawn blue wavy underline */}
                <div className="mt-2">
                  <svg className="w-32 sm:w-40 text-[#4A3AFF]" viewBox="0 0 144 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10.5C28.5 2 64.5 14 142 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                    activeCategory === tab
                      ? "bg-[#4A3AFF] text-white shadow-md shadow-indigo-500/25"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Courses 3-Column Grid (6 Cards matching Image 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayList.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm hover:shadow-2xl border border-slate-100/90 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between group/card"
              >
                <div>
                  {/* Thumbnail with Category Badge & Video Icon */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />

                    {/* Top-to-bottom sliding dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 -translate-y-full group-hover/card:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-10" />
                    
                    {/* Category pill badge on top left */}
                    <div className="absolute top-3 left-3 bg-[#4A3AFF] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md z-20">
                      <Video className="w-3.5 h-3.5" />
                      <span>{course.category}</span>
                    </div>

                    {/* Camera icon on bottom right */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-full flex items-center justify-center text-[#4A3AFF] shadow-sm z-20">
                      <Video className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold mb-2">
                    <span>{"★★★★☆"}</span>
                    <span className="text-slate-500 dark:text-slate-400 ml-1">({course.rating} / {course.reviews} Rating)</span>
                  </div>

                  {/* Course Title */}
                  <Link href={`/courses/${course.id}`}>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-[#4A3AFF] transition duration-200 mb-3 leading-snug">
                      {course.title}
                    </h3>
                  </Link>

                  {/* Meta Information (Lessons & Students) */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-3.5 border-b border-slate-100 dark:border-slate-800 font-medium">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#4A3AFF]" />
                      <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#4A3AFF]" />
                      <span>{course.students} Students</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Price & Instructor */}
                <div className="flex items-center justify-between pt-3.5">
                  <span className="text-lg font-extrabold text-[#4A3AFF]">
                    ${course.price}
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden relative ring-1 ring-slate-200 dark:ring-slate-700">
                      <Image
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {course.instructor}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
