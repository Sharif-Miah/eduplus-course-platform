"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, User, Calendar, FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function LatestNewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const blogs = [
    {
      id: "blog-1",
      category: "Software",
      author: "Masum Billah",
      date: "January 9, 2025",
      title: "Leverage agile frameworks to provide",
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "blog-2",
      category: "Software",
      author: "Masum Billah",
      date: "January 9, 2025",
      title: "Leverage agile frameworks to provide",
      thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "blog-3",
      category: "Software",
      author: "Masum Billah",
      date: "January 9, 2025",
      title: "Leverage agile frameworks to provide",
      thumbnail: "/assets/home/course_seo_stairs.jpg",
    },
    {
      id: "blog-4",
      category: "Software",
      author: "Masum Billah",
      date: "January 9, 2025",
      title: "Leverage agile frameworks to provide",
      thumbnail: "/assets/home/course_team_discussion.jpg",
    },
    {
      id: "blog-5",
      category: "Software",
      author: "Masum Billah",
      date: "January 9, 2025",
      title: "Leverage agile frameworks to provide",
      thumbnail: "/assets/home/course_female_hoodie.jpg",
    },
    {
      id: "blog-6",
      category: "Software",
      author: "Masum Billah",
      date: "January 9, 2025",
      title: "Leverage agile frameworks to provide",
      thumbnail: "/assets/home/course_interior_design.jpg",
    },
  ];

  // Number of cards to slide
  const maxIndex = blogs.length - 3;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, handleNext]);

  return (
    <section id="blog" className="py-24 bg-slate-50/40 dark:bg-[#0b1120] relative overflow-hidden transition-colors duration-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A3AFF] mb-2">
            LATEST NEWS
          </p>
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Read Some Store About <br />
              News & Blog
            </h2>
            {/* Hand-drawn blue wavy underline */}
            <div className="flex justify-center mt-3">
              <svg className="w-32 sm:w-44 text-[#4A3AFF]" viewBox="0 0 144 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10.5C28.5 2 64.5 14 142 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Carousel Slider with Auto-Slide */}
        <div 
          className="relative overflow-hidden pb-8 pt-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out gap-6 sm:gap-8"
            style={{
              transform: `translateX(-${currentIndex * (100 / 3 + 1.2)}%)`,
            }}
          >
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-18px)] flex-shrink-0 relative group select-none"
              >
                {/* Main Card */}
                <div className="relative w-full">
                  
                  {/* Photo Container with Top-to-Bottom Sliding Dark Hover Shadow */}
                  <div className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-md">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Top-to-bottom sliding dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 pointer-events-none" />

                    {/* Category Badge top-left */}
                    <div className="absolute top-3.5 left-3.5 bg-[#4A3AFF] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md z-20">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{blog.category}</span>
                    </div>
                  </div>

                  {/* Elevated Overlapping White Content Card matching Screenshot */}
                  <div className="relative -mt-10 mx-3 sm:mx-4 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-100 dark:border-slate-800 text-left z-20 transition-transform duration-300 group-hover:-translate-y-1">
                    
                    {/* Meta Row: Author & Date */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#4A3AFF]" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#4A3AFF]" />
                        <span>{blog.date}</span>
                      </div>
                    </div>

                    {/* Blog Heading */}
                    <Link href={`/blog/${blog.id}`}>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#4A3AFF] transition-colors mb-4">
                        {blog.title}
                      </h3>
                    </Link>

                    {/* Bottom Arrow Button */}
                    <div className="pt-1">
                      <Link
                        href={`/blog/${blog.id}`}
                        className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-[#4A3AFF] dark:group-hover:bg-[#4A3AFF] text-slate-400 dark:text-slate-400 group-hover:text-white dark:group-hover:text-white border border-slate-100 dark:border-slate-700 group-hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

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
