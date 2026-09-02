"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

// Custom vector line-art icons matching the mockup image exactly
function ArtDesignIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M6 7h.01M9 7h.01M12 7h.01" />
      <path d="M4 14c3-4 6-4 8 0s5 4 8 0" />
      <circle cx="8" cy="11" r="1.5" fill="currentColor" />
      <circle cx="16" cy="11" r="1.5" fill="currentColor" />
      <path d="M12 11v6" />
      <path d="M10 17h4v4h-4z" />
    </svg>
  );
}

function WebDevIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M8 10l-3 2 3 2" />
      <path d="M16 10l3 2-3 2" />
      <line x1="13" y1="9" x2="11" y2="15" />
    </svg>
  );
}

function FinanceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="7" r="4" />
      <path d="M12 5v4" />
      <path d="M10.5 6.5h3" />
      <path d="M3 18l5-3h6l4 2 3-1" />
      <path d="M2 14l4-2 4 1 5-2" />
    </svg>
  );
}

function MarketingIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 11l13-5v12L3 13v-2z" />
      <path d="M16 8l4-2v12l-4-2" />
      <path d="M6 13v6a2 2 0 0 0 2 2h1" />
      <path d="M20 10a3 3 0 0 1 0 4" />
    </svg>
  );
}

function MobileAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
      <path d="M9 7h6" />
      <circle cx="15" cy="13" r="2.5" />
      <path d="M15 9.5v1M15 15.5v1M11.5 13h1M17.5 13h1" />
    </svg>
  );
}

function DataScienceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="8" cy="16" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      <path d="M8 8l4 4 4-4M8 16l4-4 4 4M8 8v8M16 8v8" />
    </svg>
  );
}

function HealthIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 14c1.5-1.5 2-3 2-4.5A4.5 4.5 0 0 0 13.5 5c-1 0-2 .5-2.5 1.5C10.5 5.5 9.5 5 8.5 5A4.5 4.5 0 0 0 4 9.5c0 1.5.5 3 2 4.5l5 5 8-8z" />
      <line x1="2" y1="12" x2="6" y2="12" strokeWidth="2.5" />
      <line x1="18" y1="12" x2="22" y2="12" strokeWidth="2.5" />
    </svg>
  );
}

function AnimationIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M7 21h10M12 17v4" />
      <polygon points="10 7 15 10 10 13 10 7" fill="currentColor" />
    </svg>
  );
}

const iconMap = {
  "Art & Design": ArtDesignIcon,
  "Design": ArtDesignIcon,
  "Web Development": WebDevIcon,
  "Development": WebDevIcon,
  "Finance Account": FinanceIcon,
  "Finance": FinanceIcon,
  "Marketing": MarketingIcon,
  "Mobile Application": MobileAppIcon,
  "Mobile": MobileAppIcon,
  "Data Science": DataScienceIcon,
  "Health and Fitness": HealthIcon,
  "Health": HealthIcon,
  "3D Animation": AnimationIcon,
  "Animation": AnimationIcon,
};

const categoryBgImages = {
  "Art & Design": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
  "Design": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
  "Web Development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  "Development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  "Finance Account": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
  "Finance": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
  "Marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  "Mobile Application": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
  "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  "Health and Fitness": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
  "3D Animation": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
};

export default function CategorySection({ categories = [] }) {
  const defaultCategories = [
    { id: "1", title: "Art & Design", count: 5, icon: ArtDesignIcon, bg: categoryBgImages["Art & Design"] },
    { id: "2", title: "Web Development", count: 10, icon: WebDevIcon, bg: categoryBgImages["Web Development"] },
    { id: "3", title: "Finance Account", count: 6, icon: FinanceIcon, bg: categoryBgImages["Finance Account"] },
    { id: "4", title: "Marketing", count: 3, icon: MarketingIcon, bg: categoryBgImages["Marketing"] },
    { id: "5", title: "Mobile Application", count: 8, icon: MobileAppIcon, bg: categoryBgImages["Mobile Application"] },
    { id: "6", title: "Data Science", count: 4, icon: DataScienceIcon, bg: categoryBgImages["Data Science"] },
    { id: "7", title: "Health and Fitness", count: 8, icon: HealthIcon, bg: categoryBgImages["Health and Fitness"] },
    { id: "8", title: "3D Animation", count: 4, icon: AnimationIcon, bg: categoryBgImages["3D Animation"] },
  ];

  const displayCategories = categories.length > 0
    ? categories.map((cat, idx) => {
        const title = cat.title || "Category";
        const IconComp = iconMap[title] || ArtDesignIcon;
        const bg = categoryBgImages[title] || (cat.thumbnail ? getImageUrl(cat.thumbnail, "categories") : defaultCategories[idx % defaultCategories.length].bg);
        return {
          id: cat.id || cat._id,
          title: title,
          count: cat.courseCount || (idx % 5 + 3),
          icon: IconComp,
          bg: bg,
        };
      })
    : defaultCategories;

  return (
    <section id="categories" className="py-24 bg-white dark:bg-[#0b1120] relative transition-colors duration-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A3AFF] mb-2">
            TOP CATEGORY
          </p>
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Browse Our Online Course <br className="hidden sm:inline" />
              Categories
            </h2>
            {/* Hand-drawn blue wavy underline accent */}
            <div className="flex justify-center mt-3">
              <svg className="w-32 sm:w-44 text-[#4A3AFF]" viewBox="0 0 144 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10.5C28.5 2 64.5 14 142 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories Grid (8/9 Cards matching 3-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id || idx}
                href={`/courses?category=${encodeURIComponent(item.id || item.title)}`}
                className="group relative h-28 sm:h-32 rounded-3xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-dashed border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-transparent transition-all duration-300 overflow-hidden flex items-center justify-between"
              >
                {/* Background image & dark blur overlay on hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Image
                    src={item.bg}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark blur overlay */}
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px]" />
                </div>

                {/* Left Area: Circle Icon + Title & Course Count */}
                <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                  {/* Circular Icon Container */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:bg-white group-hover:border-transparent group-hover:shadow-lg flex items-center justify-center text-[#4A3AFF] transition-all duration-300 flex-shrink-0">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>

                  {/* Title & Badge */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-white group-hover:text-xl transition-all duration-200 leading-snug">
                      {item.title}
                    </h3>
                    <div className="mt-1.5">
                      <span className="inline-block text-xs font-semibold text-[#4A3AFF] dark:text-indigo-300 bg-indigo-50/90 dark:bg-indigo-950/80 group-hover:bg-[#4A3AFF] group-hover:text-white px-3 py-1 rounded-md shadow-none group-hover:shadow-md transition-all duration-200">
                        {item.count} Courses
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Area: Arrow Button */}
                <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group-hover:bg-[#4A3AFF] group-hover:border-transparent flex items-center justify-center text-slate-400 dark:text-slate-400 group-hover:text-white group-hover:shadow-lg group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Categories CTA Button */}
        <div className="text-center mt-14">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
