"use client";

import Link from "next/link";
import Image from "next/image";

export default function CtaBanners() {
  return (
    <section className="pt-24 pb-20 bg-white dark:bg-[#0b1120] relative overflow-visible transition-colors duration-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-10">
          
          {/* Card 1: Get Free Courses (Exact Mockup Match with Pop-Out Head) */}
          <div className="relative bg-[#4A3AFF] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 text-white shadow-2xl flex flex-col justify-between min-h-[250px] sm:min-h-[300px] overflow-visible">
            
            {/* Subtle Grid Pattern Overlay (contained within card) */}
            <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
              <div 
                className="w-full h-full opacity-15"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Concentric rings decor on bottom left */}
              <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full border-4 border-white/10 pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full border-4 border-white/5 pointer-events-none" />
            </div>

            {/* Decorative 4-point sparkle star & Cross */}
            <div className="absolute top-8 right-[46%] text-white text-2xl animate-pulse pointer-events-none z-10">
              ✦
            </div>
            <div className="absolute bottom-10 left-[42%] text-white/50 text-xl pointer-events-none z-10">
              ✖
            </div>

            {/* Left Content Area */}
            <div className="relative z-20 max-w-[240px] sm:max-w-xs space-y-4">
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Get Free Courses
                </h3>
                {/* Thin white underline with dot */}
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-16 h-[2.5px] bg-white/90 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white/90 rounded-full" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium pt-1">
                Top instructors from around the world teach millions of student on EduPlus
              </p>

              <div className="pt-3">
                <Link
                  href="/register"
                  className="inline-block bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Right Cutout Image: Female Teacher with Pop-Out Head & Yellow Folder */}
            <div className="absolute -top-10 sm:-top-16 lg:-top-20 right-0 sm:right-2 lg:right-4 w-40 sm:w-60 lg:w-72 h-[300px] sm:h-[420px] lg:h-[450px] pointer-events-none z-30 flex items-end justify-end hidden sm:flex">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/home/cta_teacher.png"
                  alt="Female teacher holding yellow folder"
                  fill
                  unoptimized
                  className="object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </div>

          </div>

          {/* Card 2: Become a Tutor (Exact Mockup Match with Pop-Out Head) */}
          <div className="relative bg-[#4A3AFF] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 text-white shadow-2xl flex flex-col justify-between min-h-[250px] sm:min-h-[300px] overflow-visible">
            
            {/* Subtle Grid Pattern Overlay (contained within card) */}
            <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
              <div 
                className="w-full h-full opacity-15"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Left dot grid decor */}
              <div className="absolute top-8 left-4 opacity-30">
                <div className="grid grid-cols-2 gap-1.5">
                  {[...Array(14)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
                  ))}
                </div>
              </div>

              {/* Concentric rings decor on bottom right */}
              <div className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full border-4 border-white/10 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full border-4 border-white/5 pointer-events-none" />
            </div>

            {/* Decorative Cross */}
            <div className="absolute bottom-10 left-[42%] text-white/50 text-xl pointer-events-none z-10">
              ✖
            </div>

            {/* Left Content Area */}
            <div className="relative z-20 max-w-[240px] sm:max-w-xs space-y-4">
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Become a Tutor
                </h3>
                {/* Thin white underline with dot */}
                <div className="flex items-center gap-1 mt-2">
                  <div className="w-16 h-[2.5px] bg-white/90 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white/90 rounded-full" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium pt-1">
                Top instructors from around the world teach millions of student on EduPlus
              </p>

              <div className="pt-3">
                <Link
                  href="/register"
                  className="inline-block bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Register Now
                </Link>
              </div>
            </div>

            {/* Right Cutout Image: Male Tutor with Pop-Out Head & Raised Fist */}
            <div className="absolute -top-10 sm:-top-16 lg:-top-20 right-0 sm:right-2 lg:right-4 w-40 sm:w-60 lg:w-72 h-[300px] sm:h-[420px] lg:h-[450px] pointer-events-none z-30 flex items-end justify-end hidden sm:flex">
              <div className="relative w-full h-full">
                <Image
                  src="/assets/home/cta_tutor.png"
                  alt="Male tutor celebrating"
                  fill
                  unoptimized
                  className="object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
