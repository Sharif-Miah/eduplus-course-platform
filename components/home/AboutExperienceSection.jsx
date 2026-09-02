"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, GraduationCap, Users, UserCheck, Award, Heart } from "lucide-react";
import CountUp from "./CountUp";

export default function AboutExperienceSection() {
  const col1Features = [
    "Best Instructors & Courses",
    "Trusted by Students",
    "100% ISO Certified",
  ];

  const col2Features = [
    "Online Courses",
    "Live Classes",
    "24 Hours Support",
  ];

  const stats = [
    { 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      end: 118, 
      suffix: "k", 
      label: "Our Happy Students" 
    },
    { 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
      end: 150, 
      suffix: "k", 
      label: "Enrolled Learner" 
    },
    { 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
          <path d="M16 11l2 2 4-4" />
        </svg>
      ),
      end: 120, 
      suffix: "+", 
      label: "Expert Instructor" 
    },
    { 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      ),
      end: 96, 
      suffix: "%", 
      label: "Satisfaction Rate" 
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0b1120] relative overflow-hidden transition-colors duration-200">
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Creative Image Collage (Image 1 Style) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[360px] sm:min-h-[520px]">
            
            {/* Top-left decorative wavy lines */}
            <div className="absolute top-2 left-6 text-indigo-400 opacity-80 animate-float-slow hidden sm:block">
              <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
                <path d="M5 5C15 15 5 25 15 35C25 45 15 55 25 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M18 5C28 15 18 25 28 35C38 45 28 55 38 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Top "love" colorful doodle with sparkles */}
            <div className="absolute -top-4 right-1/4 text-rose-500 font-serif italic text-lg sm:text-2xl font-bold tracking-wider opacity-90 rotate-6 flex items-center gap-1 animate-pulse hidden sm:flex">
              <span>love</span>
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>

            {/* Bottom-left dot grid */}
            <div className="absolute bottom-6 left-8 opacity-40 hidden sm:block">
              <div className="grid grid-cols-5 gap-1.5">
                {[...Array(25)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-[#4A3AFF] rounded-full" />
                ))}
              </div>
            </div>

            {/* Watermark outline graduation cap */}
            <div className="absolute -bottom-6 right-2 text-slate-100 dark:text-slate-800 -z-0 pointer-events-none hidden sm:block">
              <GraduationCap className="w-44 h-44 stroke-[1]" />
            </div>

            {/* Pill Shaped Photo 1 (Studying at table) */}
            <div className="relative w-40 sm:w-64 h-64 sm:h-96 rounded-[70px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 z-10 -translate-x-4 sm:-translate-x-12">
              <Image
                src="/assets/home/about_student_study.jpg"
                alt="Students studying"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Circular Photo 2 (Student with glasses & books on teal background) */}
            <div className="relative w-40 sm:w-64 h-40 sm:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 z-20 -translate-x-2 sm:-translate-x-10 translate-y-8 bg-[#14C88C]">
              <Image
                src="/assets/home/about_student_portrait.jpg"
                alt="University Student"
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Floating Experience Advisor Card (Image 1 Style) */}
            <div className="absolute bottom-14 left-2 sm:left-10 z-30 bg-white dark:bg-slate-900 rounded-2xl p-3 sm:p-5 shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2 text-center animate-float">
              <div className="w-12 h-12 rounded-full bg-[#4A3AFF] text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                Experience<br />Advisor
              </span>
            </div>

          </div>

          {/* Right Column: About Content (Image 1 Style) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A3AFF] mb-2">
                ABOUT OUR EDPLUS
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                We create unique digital media <br className="hidden sm:inline" />
                experiences.
              </h2>
              {/* Hand-drawn blue wavy underline */}
              <div className="mt-2">
                <svg className="w-32 sm:w-40 text-[#4A3AFF]" viewBox="0 0 144 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10.5C28.5 2 64.5 14 142 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              At University Edplus, we are driven by the transformative power of education and the limitless potential within each individual. Founded in 1971, we have remained steadfast in our commitment to nurturing intellectual curiosity, promoting academic excellence, cultivating a dynamic campus community.
            </p>

            {/* Feature Checkmarks (2 Columns with Dotted Connectors matching Image 1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Column 1 */}
              <div className="space-y-4 relative">
                {col1Features.map((title, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-[#4A3AFF] transition-colors">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-[#4A3AFF] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {title}
                      </span>
                    </div>

                    {/* Dotted connector */}
                    {idx < col1Features.length - 1 && (
                      <div className="w-0.5 h-3 border-l-2 border-dotted border-indigo-300 dark:border-indigo-800 mx-auto my-0.5" />
                    )}
                  </div>
                ))}
                {/* Bottom Blue Diamond */}
                <div className="w-2.5 h-2.5 rotate-45 bg-[#4A3AFF] mx-auto shadow-sm" />
              </div>

              {/* Column 2 */}
              <div className="space-y-4 relative">
                {col2Features.map((title, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-[#4A3AFF] transition-colors">
                      <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-[#4A3AFF] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {title}
                      </span>
                    </div>

                    {/* Dotted connector */}
                    {idx < col2Features.length - 1 && (
                      <div className="w-0.5 h-3 border-l-2 border-dotted border-indigo-300 dark:border-indigo-800 mx-auto my-0.5" />
                    )}
                  </div>
                ))}
                {/* Bottom Blue Diamond */}
                <div className="w-2.5 h-2.5 rotate-45 bg-[#4A3AFF] mx-auto shadow-sm" />
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>View All Program</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

        {/* Bottom Curved Stats Banner (Image 1 & 2 Style) */}
        <div className="mt-14 sm:mt-20 bg-[#4A3AFF] rounded-[24px] sm:rounded-[32px] p-6 sm:p-12 shadow-2xl text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-center ${
                  index > 0 ? "pt-6 md:pt-0 md:pl-6" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-full border-2 border-white/35 flex items-center justify-center mb-3 text-white">
                  {stat.icon}
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  <CountUp end={stat.end} suffix={stat.suffix} duration={2200} />
                </h3>
                <p className="text-xs sm:text-sm font-medium text-indigo-100 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
