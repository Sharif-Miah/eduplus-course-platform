"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, GraduationCap, Facebook, Youtube, ChevronLeft, ChevronRight } from "lucide-react";

export default function InstructorsAndPartners() {
  // Instructors Slider State
  const [instructorIndex, setInstructorIndex] = useState(0);
  const [isInstructorPaused, setIsInstructorPaused] = useState(false);

  // Brands Slider State
  const [brandIndex, setBrandIndex] = useState(0);
  const [isBrandPaused, setIsBrandPaused] = useState(false);

  const instructors = [
    {
      id: 1,
      name: "MD. Monaym Billah",
      role: "Web Developer",
      courses: 18,
      students: 125,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "MD. Monaym Billah",
      role: "Web Developer",
      courses: 60,
      students: 125,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "MD. Monaym Billah",
      role: "Web Developer",
      courses: 25,
      students: 125,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "MD. Monaym Billah",
      role: "English Lecturer",
      courses: 54,
      students: 125,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Sarah Jenkins",
      role: "UI/UX Designer",
      courses: 42,
      students: 180,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Alex Rivera",
      role: "Data Scientist",
      courses: 36,
      students: 210,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "Elena Rossi",
      role: "Digital Marketer",
      courses: 28,
      students: 140,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 8,
      name: "David Kim",
      role: "Full Stack Engineer",
      courses: 50,
      students: 310,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 9,
      name: "Michael Chen",
      role: "Cloud Architect",
      courses: 32,
      students: 195,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 10,
      name: "Sophia Martinez",
      role: "AI & ML Specialist",
      courses: 45,
      students: 260,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    },
  ];

  // Brand Partners Data matching screenshot + global additions
  const brands = [
    {
      id: "trustpilot",
      render: (
        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-extrabold text-xl sm:text-2xl whitespace-nowrap">
          <span className="text-[#00B67A] text-2xl font-black">★</span>
          <span>Trustpilot</span>
        </div>
      ),
    },
    {
      id: "coursera",
      render: (
        <div className="flex items-center gap-1 font-black text-2xl sm:text-3xl text-[#0056D2] dark:text-[#4A88FF] tracking-tighter whitespace-nowrap">
          <span>coursera</span>
        </div>
      ),
    },
    {
      id: "udemy",
      render: (
        <div className="flex items-center gap-1.5 font-bold text-2xl sm:text-3xl whitespace-nowrap">
          <span className="text-[#A435F0] text-3xl font-black">u</span>
          <span className="text-slate-900 dark:text-white font-extrabold tracking-tight">Udemy</span>
        </div>
      ),
    },
    {
      id: "british-council",
      render: (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="flex flex-col text-[11px] sm:text-xs font-black leading-none tracking-wider text-slate-900 dark:text-white">
            <span>BRITISH</span>
            <span>COUNCIL</span>
          </div>
          <div className="grid grid-cols-2 gap-1 w-5 h-5">
            <div className="w-2 h-2 rounded-full bg-[#00A9E0]" />
            <div className="w-2 h-2 rounded-full bg-[#00A9E0]" />
            <div className="w-2 h-2 rounded-full bg-[#00A9E0]" />
            <div className="w-2 h-2 rounded-full bg-[#00A9E0]" />
          </div>
        </div>
      ),
    },
    {
      id: "hubspot",
      render: (
        <div className="flex items-center font-black text-2xl sm:text-3xl text-slate-900 dark:text-white whitespace-nowrap">
          <span>HubSp</span>
          <div className="w-4 h-4 rounded-full border-[3.5px] border-[#FF7A59] -ml-0.5 -mr-0.5" />
          <span>t</span>
        </div>
      ),
    },
    {
      id: "edx",
      render: (
        <div className="flex items-center gap-1 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white whitespace-nowrap">
          <span className="text-[#B52555]">ed</span>
          <span className="text-slate-900 dark:text-white">X</span>
        </div>
      ),
    },
    {
      id: "skillshare",
      render: (
        <div className="flex items-center text-xl sm:text-2xl font-black text-[#00FF84] bg-slate-900 dark:bg-slate-800 px-3 py-1 rounded-md tracking-wider whitespace-nowrap">
          <span>SKILLSHARE</span>
        </div>
      ),
    },
    {
      id: "khan-academy",
      render: (
        <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
          <span className="text-[#14BF96] text-2xl">🌱</span>
          <span>Khan Academy</span>
        </div>
      ),
    },
    {
      id: "linkedin-learning",
      render: (
        <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white whitespace-nowrap">
          <span className="bg-[#0A66C2] text-white px-1.5 py-0.5 rounded text-sm font-black">in</span>
          <span className="font-extrabold">Learning</span>
        </div>
      ),
    },
  ];

  // Instructors max index (showing 4 at a time)
  const maxInstructorIndex = instructors.length - 4;

  const handleNextInstructor = useCallback(() => {
    setInstructorIndex((prev) => (prev >= maxInstructorIndex ? 0 : prev + 1));
  }, [maxInstructorIndex]);

  const handlePrevInstructor = () => {
    setInstructorIndex((prev) => (prev <= 0 ? maxInstructorIndex : prev - 1));
  };

  // Brands max index (showing 5 at a time)
  const maxBrandIndex = brands.length - 5;

  const handleNextBrand = useCallback(() => {
    setBrandIndex((prev) => (prev >= maxBrandIndex ? 0 : prev + 1));
  }, [maxBrandIndex]);

  const handlePrevBrand = () => {
    setBrandIndex((prev) => (prev <= 0 ? maxBrandIndex : prev - 1));
  };

  // Instructors auto-slide timer
  useEffect(() => {
    if (isInstructorPaused || maxInstructorIndex <= 0) return;
    const timer = setInterval(() => {
      handleNextInstructor();
    }, 3500);
    return () => clearInterval(timer);
  }, [isInstructorPaused, maxInstructorIndex, handleNextInstructor]);

  // Brands auto-slide timer
  useEffect(() => {
    if (isBrandPaused || maxBrandIndex <= 0) return;
    const timer = setInterval(() => {
      handleNextBrand();
    }, 3000);
    return () => clearInterval(timer);
  }, [isBrandPaused, maxBrandIndex, handleNextBrand]);

  return (
    <section id="instructors" className="py-24 bg-white dark:bg-[#0b1120] relative overflow-hidden transition-colors duration-200">
      {/* SVG ClipPath Definition for the exact notched shape */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="instructor-card-notch" clipPathUnits="objectBoundingBox">
            <path d="M 0.08,0 
                     L 0.74,0 
                     Q 0.79,0 0.79,0.06 
                     L 0.79,0.44 
                     Q 0.79,0.50 0.85,0.50 
                     L 0.94,0.50 
                     Q 1.0,0.50 1.0,0.56 
                     L 1.0,0.92 
                     Q 1.0,1.0 0.92,1.0 
                     L 0.08,1.0 
                     Q 0,1.0 0,0.92 
                     L 0,0.08 
                     Q 0,0 0.08,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ======================================================== */}
        {/* 1. OUR EXPERT INSTRUCTORS HEADER */}
        {/* ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A3AFF] mb-2">
            INSTRUCTORS
          </p>
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Our Expert Instructors
            </h2>
            {/* Hand-drawn blue wavy underline */}
            <div className="flex justify-center mt-3">
              <svg className="w-32 sm:w-44 text-[#4A3AFF]" viewBox="0 0 144 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10.5C28.5 2 64.5 14 142 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INSTRUCTORS AUTO-SLIDING CAROUSEL (10 CARDS) */}
        {/* ======================================================== */}
        <div 
          className="relative overflow-hidden mb-24 pb-8 pt-3"
          onMouseEnter={() => setIsInstructorPaused(true)}
          onMouseLeave={() => setIsInstructorPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out gap-3 sm:gap-8"
            style={{
              transform: `translateX(-${instructorIndex * (100 / 4 + 0.75)}%)`,
            }}
          >
            {instructors.map((inst) => (
              <div
                key={inst.id}
                className="w-[calc(50%-6px)] sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] flex-shrink-0 relative group select-none"
              >
                {/* Outer Relative Frame */}
                <div className="relative w-full">
                  
                  {/* Photo area with exact SVG Cutout Notch */}
                  <div 
                    className="relative w-full aspect-[4/4] sm:aspect-[4/4.5] bg-[#E2E5EB] dark:bg-slate-800 overflow-hidden"
                    style={{
                      clipPath: "url(#instructor-card-notch)",
                    }}
                  >
                    {/* The Instructor Image */}
                    <Image
                      src={inst.avatar}
                      alt={inst.name}
                      fill
                      unoptimized
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Left-to-Right Purple Sliding Hover Shadow Overlay */}
                    <div className="absolute inset-0 bg-[#8578FB]/75 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-10 pointer-events-none" />
                  </div>

                  {/* 3 Large Circular Social Buttons sitting in the top-right notch - hidden on mobile */}
                  <div className="absolute top-2.5 right-0.5 flex-col gap-2.5 z-20 hidden sm:flex">
                    <Link
                      href="#"
                      aria-label="Facebook"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-[#4A3AFF] dark:hover:bg-[#4A3AFF] hover:text-white shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center transition-all duration-200"
                    >
                      <Facebook className="w-4 h-4 fill-current" />
                    </Link>
                    <Link
                      href="#"
                      aria-label="X Twitter"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-[#4A3AFF] dark:hover:bg-[#4A3AFF] hover:text-white shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center transition-all duration-200"
                    >
                      <span className="text-sm font-black">✕</span>
                    </Link>
                    <Link
                      href="#"
                      aria-label="YouTube"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-[#4A3AFF] dark:hover:bg-[#4A3AFF] hover:text-white shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center transition-all duration-200"
                    >
                      <Youtube className="w-4 h-4 fill-current" />
                    </Link>
                  </div>

                  {/* Elevated White Card overlapping the bottom of photo */}
                  <div className="relative -mt-8 sm:-mt-12 mx-1.5 sm:mx-3 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-xl border border-slate-100 dark:border-slate-800 text-center z-20 transition-transform duration-300 group-hover:-translate-y-1">
                    <h3 className="text-xs sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#4A3AFF] transition-colors leading-snug truncate">
                      {inst.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      {inst.role}
                    </p>

                    {/* Faint Dashed Divider matching image */}
                    <div className="border-t border-dashed border-indigo-100 dark:border-slate-800 my-1.5 sm:my-2.5" />

                    {/* Meta Row: Courses & Students */}
                    <div className="flex items-center justify-between text-xs font-semibold px-0 sm:px-1 gap-1">
                      <div className="flex items-center gap-1.5 text-[#4A3AFF] dark:text-indigo-300">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs font-bold">{inst.courses} Courses</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#4A3AFF] dark:text-indigo-300">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span className="text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs font-bold">{inst.students} Students</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. BRAND PARTNERS AUTO-SLIDING PILL CAROUSEL */}
        {/* ======================================================== */}
        <div className="relative max-w-6xl mx-auto px-4">
          
          {/* Pill Container */}
          <div 
            className="relative rounded-full border border-indigo-100/90 dark:border-slate-800 py-6 sm:py-7 px-8 sm:px-14 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            onMouseEnter={() => setIsBrandPaused(true)}
            onMouseLeave={() => setIsBrandPaused(false)}
          >
            {/* Auto-sliding Brands Track */}
            <div 
              className="flex transition-transform duration-700 ease-in-out items-center"
              style={{
                transform: `translateX(-${brandIndex * (100 / 5)}%)`,
              }}
            >
              {brands.map((brand) => (
                <div 
                  key={brand.id}
                  className="w-1/2 sm:w-1/3 lg:w-1/5 flex-shrink-0 flex items-center justify-center px-4 select-none opacity-85 hover:opacity-100 transition-opacity"
                >
                  {brand.render}
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button Overlapping Left Edge */}
          <button 
            onClick={handlePrevBrand} 
            aria-label="Previous Brand"
            className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-slate-800 border border-indigo-100/90 dark:border-slate-700 hover:bg-[#4A3AFF] dark:hover:bg-[#4A3AFF] hover:border-transparent hover:text-white text-slate-500 dark:text-slate-300 shadow-md hidden sm:flex items-center justify-center transition-all duration-200 z-20 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Right Arrow Button Overlapping Right Edge */}
          <button 
            onClick={handleNextBrand} 
            aria-label="Next Brand"
            className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-slate-800 border border-indigo-100/90 dark:border-slate-700 hover:bg-[#4A3AFF] dark:hover:bg-[#4A3AFF] hover:border-transparent hover:text-white text-slate-500 dark:text-slate-300 shadow-md hidden sm:flex items-center justify-center transition-all duration-200 z-20 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>

      </div>
    </section>
  );
}
