"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

export default function HowItWorksAndTestimonials() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      location: "Australia",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      content: "Duis rhoncus orci utedn metus rhoncus, non is dictum purus bibendum. Suspendisse id orci sit amet justo interdum hendrerit sagittis.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      location: "United States",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      content: "Duis rhoncus orci utedn metus rhoncus, non is dictum purus bibendum. Suspendisse id orci sit amet justo interdum hendrerit sagittis.",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Brown",
      location: "United Kingdom",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      content: "The curriculum and mentors are top notch. I built 4 production apps and landed my dream software developer position within months.",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Davis",
      location: "Canada",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      content: "Exceptional learning experience! The interactive lessons, community support, and instructor feedback made complex topics very easy to master.",
      rating: 5,
    },
    {
      id: 5,
      name: "Lucas Müller",
      location: "Germany",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop",
      content: "Duis rhoncus orci utedn metus rhoncus, non is dictum purus bibendum. Suspendisse id orci sit amet justo interdum hendrerit sagittis.",
      rating: 5,
    },
    {
      id: 6,
      name: "Elena Rossi",
      location: "Italy",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      content: "High quality lessons and amazing resources. The best online education platform I have ever used for expanding my digital design skills.",
      rating: 5,
    },
  ];

  // Maximum index so we always have cards to fill 2 visible slots on desktop
  const maxIndex = testimonials.length - 2;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-slide effect every 3.5 seconds (paused on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex, handleNext]);

  return (
    <section className="py-24 bg-white dark:bg-[#0b1120] relative overflow-hidden transition-colors duration-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* ======================================================== */}
        {/* TOP SECTION: WORKING PROCESS / HOW IT WORKS */}
        {/* ======================================================== */}
        <div className="mb-28">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A3AFF] mb-2">
              WORKING PROCESS
            </p>
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                How It Work
              </h2>
              {/* Hand-drawn blue wavy underline */}
              <div className="flex justify-center mt-3">
                <svg className="w-32 sm:w-44 text-[#4A3AFF]" viewBox="0 0 144 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10.5C28.5 2 64.5 14 142 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Video Showcase Card matching Image 1 */}
          <div className="relative max-w-5xl mx-auto">
            
            {/* Top-left dot grid decor */}
            <div className="absolute -top-6 -left-8 -z-0 opacity-40">
              <div className="grid grid-cols-5 gap-1.5">
                {[...Array(25)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                ))}
              </div>
            </div>

            {/* Bottom-right green chevron decor */}
            <div className="absolute -bottom-6 -right-6 text-[#14C88C] opacity-90 flex gap-1 z-20">
              <span className="text-3xl font-bold tracking-tighter">{"»»"}</span>
            </div>

            <div className="relative aspect-[16/8] sm:aspect-[21/9] rounded-[32px] overflow-hidden shadow-2xl bg-slate-900 z-10 group border-4 border-white dark:border-slate-800">
              <Image
                src="/assets/home/how_it_works_video.jpg"
                alt="Students collaborating"
                fill
                unoptimized
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

              {/* Large Outline "Intro Video" Typography */}
              <div className="absolute inset-0 flex items-center justify-start pl-8 sm:pl-16 pointer-events-none select-none">
                <h3
                  className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent tracking-wider leading-none"
                  style={{
                    WebkitTextStroke: "1.8px rgba(255, 255, 255, 0.45)",
                  }}
                >
                  Intro <br />
                  Video
                </h3>
              </div>

              {/* Central/Right Floating Play Button */}
              <div className="absolute inset-0 flex items-center justify-end pr-12 sm:pr-24 z-20">
                <button
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play Intro Video"
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#4A3AFF] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group/btn cursor-pointer"
                >
                  {/* Pulsing ring */}
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-60 pointer-events-none" />
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-[#4A3AFF] ml-1" />
                </button>
              </div>

              {/* Video Modal if clicked */}
              {isPlaying && (
                <div className="absolute inset-0 bg-slate-950 z-30 flex items-center justify-center p-4">
                  <iframe
                    className="w-full h-full rounded-2xl"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="EduPlus Introduction"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 text-white bg-slate-800/80 rounded-full px-3 py-1 text-xs font-bold cursor-pointer"
                  >
                    Close ✕
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>


        {/* ======================================================== */}
        {/* BOTTOM SECTION: TESTIMONIALS (Image 2 Style) */}
        {/* ======================================================== */}
        <div id="testimonials" className="pt-4">
          
          {/* Section Header with Slider Navigation Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A3AFF] mb-2">
                TESTIMONIALS
              </p>
              <div className="relative inline-block">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  People’s Say About Our <br className="hidden sm:inline" />
                  Edplus
                </h2>
                {/* Hand-drawn blue wavy underline */}
                <div className="mt-2">
                  <svg className="w-32 sm:w-40 text-[#4A3AFF]" viewBox="0 0 144 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10.5C28.5 2 64.5 14 142 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-[#4A3AFF] dark:hover:bg-[#4A3AFF] hover:border-transparent hover:text-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-[#4A3AFF] dark:hover:bg-[#4A3AFF] hover:border-transparent hover:text-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonials Container: Static Left 4.8 Card + Dynamic 2-Card Slider on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Static Card: 4.8 5-Star Rating Showcase Card */}
            <div className="lg:col-span-4 relative rounded-3xl overflow-hidden shadow-xl min-h-[260px] p-6 flex flex-col items-center justify-center text-center bg-slate-900 border border-slate-800">
              <Image
                src="/assets/home/testimonial_rating_bg.jpg"
                alt="Rating showcase"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/65" />

              <div className="relative z-10 space-y-2">
                <h3 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  4.8
                </h3>
                <div className="flex justify-center text-amber-400 text-lg">
                  {"★★★★★"}
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wider mt-1">
                  5 Star Rating
                </p>
              </div>
            </div>

            {/* Right Dynamic Carousel: 2 Cards Visible with Smooth Auto-Slide */}
            <div 
              className="lg:col-span-8 overflow-hidden relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out h-full gap-6"
                style={{
                  transform: `translateX(-${currentIndex * (100 / 2 + 1.5)}%)`,
                }}
              >
                {testimonials.map((item) => (
                  <div
                    key={item.id}
                    className="w-full sm:w-[calc(50%-12px)] flex-shrink-0 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-md hover:shadow-2xl border border-slate-100/90 dark:border-slate-800 flex flex-col justify-between relative transition-all duration-300"
                  >
                    <div>
                      {/* Author Info */}
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative ring-2 ring-indigo-50 dark:ring-indigo-950 flex-shrink-0">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.name}</h4>
                          <p className="text-xs font-semibold text-[#4A3AFF]">{item.location}</p>
                        </div>
                      </div>

                      {/* Quote Content */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                        {item.content}
                      </p>
                    </div>

                    {/* Bottom Row: Rating Stars + Quotation Mark SVG */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800">
                      <div className="flex text-amber-400 text-sm">
                        {"★★★★★"}
                      </div>
                      
                      {/* Stylized Quotation Mark */}
                      <svg className="w-8 h-8 text-indigo-100 dark:text-slate-800 fill-current opacity-80" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
