"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Sparkles, ArrowRight, Layers } from "lucide-react";
import CourseCard from "@/app/(main)/courses/_components/CourseCard";

const RelatedCourses = ({ courses = [] }) => {
  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 transition-colors">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-[#4A3AFF]/10 text-[#4A3AFF] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended For You</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Related Courses
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              Expand your tech skills further with these top-rated, hands-on programming courses.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4A3AFF] hover:text-[#3D2FE6] transition-colors group flex-shrink-0"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Grid of Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id || course._id} course={course} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedCourses;

