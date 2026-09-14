"use client";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import Link from "next/link";
import { Facebook, Linkedin, Youtube, Send } from "lucide-react";

export default function SiteFooter({ className }) {
  return (
    <footer className={cn("relative bg-[#FBFBFE] dark:bg-[#070d18] pt-24 pb-8 text-slate-600 dark:text-slate-300 overflow-hidden transition-colors duration-200 border-t border-slate-100 dark:border-slate-800/60", className)}>
      
      {/* Background Guilloche Curved Geometric Wave Pattern matching Screenshot */}
      <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden">
        <svg
          className="w-full h-full text-slate-300/80 dark:text-slate-800/60"
          viewBox="0 0 1600 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <g stroke="currentColor" strokeWidth="1">
            <path d="M-200,200 C200,50 600,600 1100,250 C1350,80 1600,300 1800,200" />
            <path d="M-200,220 C220,70 620,620 1120,270 C1370,100 1620,320 1800,220" />
            <path d="M-200,240 C240,90 640,640 1140,290 C1390,120 1640,340 1800,240" />
            <path d="M-200,260 C260,110 660,660 1160,310 C1410,140 1660,360 1800,260" />
            <path d="M-200,280 C280,130 680,680 1180,330 C1430,160 1680,380 1800,280" />
            <path d="M-200,300 C300,150 700,700 1200,350 C1450,180 1700,400 1800,300" />
            <path d="M-200,320 C320,170 720,720 1220,370 C1470,200 1720,420 1800,320" />
            <path d="M-200,340 C340,190 740,740 1240,390 C1490,220 1740,440 1800,340" />
            <path d="M-200,360 C360,210 760,760 1260,410 C1510,240 1760,460 1800,360" />
            <path d="M-200,380 C380,230 780,780 1280,430 C1530,260 1780,480 1800,380" />
            <path d="M-200,400 C400,250 800,800 1300,450 C1550,280 1800,500 1800,400" />
          </g>
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 5 Columns Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-20">
          
          {/* Column 1: About Us (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">About Us</h4>
              {/* Soft Purple Wavy Underline */}
              <div className="mt-1.5">
                <svg className="w-12 text-[#938BFB]" viewBox="0 0 48 8" fill="none">
                  <path d="M1 5C5 1 9 7 13 3C17 1 21 7 25 3C29 1 33 7 37 3C41 1 45 7 47 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal max-w-[260px]">
              Duis aute irure dolor in reprehenderit in volupta velit esse cillum dolore eu fugiat nulla pariatur. excepteur sint occaecat
            </p>
            <div className="space-y-1.5 text-xs sm:text-[13px] font-semibold pt-1">
              <p>
                <span className="text-slate-900 dark:text-slate-200 font-bold">Email: </span>
                <a href="mailto:support@example.com" className="text-[#4A3AFF] dark:text-indigo-400 hover:underline font-semibold">support@example.com</a>
              </p>
              <p>
                <span className="text-slate-900 dark:text-slate-200 font-bold">Phone: </span>
                <a href="tel:+9801736895478" className="text-[#4A3AFF] dark:text-indigo-400 hover:underline font-semibold">+9801736895478</a>
              </p>
              <p>
                <span className="text-slate-900 dark:text-slate-200 font-bold">Location: </span>
                <span className="text-[#4A3AFF] dark:text-indigo-400 font-semibold">3500 Lenox Road , USA</span>
              </p>
            </div>
          </div>

          {/* Column 2: Company (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">Company</h4>
              <div className="mt-1.5">
                <svg className="w-12 text-[#938BFB]" viewBox="0 0 48 8" fill="none">
                  <path d="M1 5C5 1 9 7 13 3C17 1 21 7 25 3C29 1 33 7 37 3C41 1 45 7 47 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium">
              <li><Link href="/#about" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">About</Link></li>
              <li><Link href="/courses" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Course</Link></li>
              <li><Link href="/#instructors" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Instructor</Link></li>
              <li><Link href="/events" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/#instructors" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Instructor Details</Link></li>
              <li><Link href="/courses" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Course Catalog</Link></li>
            </ul>
          </div>

          {/* Column 3: Useful Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">Useful Links</h4>
              <div className="mt-1.5">
                <svg className="w-12 text-[#938BFB]" viewBox="0 0 48 8" fill="none">
                  <path d="M1 5C5 1 9 7 13 3C17 1 21 7 25 3C29 1 33 7 37 3C41 1 45 7 47 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium">
              <li><Link href="/contact" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/courses" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">All Courses</Link></li>
              <li><Link href="/#instructors" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Instructors</Link></li>
              <li><Link href="/blog" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Blog & Articles</Link></li>
              <li><Link href="/services" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Explore (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">Explore</h4>
              <div className="mt-1.5">
                <svg className="w-12 text-[#938BFB]" viewBox="0 0 48 8" fill="none">
                  <path d="M1 5C5 1 9 7 13 3C17 1 21 7 25 3C29 1 33 7 37 3C41 1 45 7 47 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-medium">
              <li><Link href="/contact" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Support Desk</Link></li>
              <li><Link href="/courses" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Top Categories</Link></li>
              <li><Link href="/#instructors" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Mentors</Link></li>
              <li><Link href="/docs" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/services" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#4A3AFF] dark:hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Column 5: Sign up for the Newsletter (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">Sign up for the Newsletter</h4>
              <div className="mt-1.5">
                <svg className="w-12 text-[#938BFB]" viewBox="0 0 48 8" fill="none">
                  <path d="M1 5C5 1 9 7 13 3C17 1 21 7 25 3C29 1 33 7 37 3C41 1 45 7 47 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal max-w-[280px]">
              Duis aute irure dolor in reprehenderit in volupta velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            {/* Newsletter Input with Integrated Send Button */}
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center pt-1">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full bg-[#ECEFF8] dark:bg-slate-900 border border-transparent dark:border-slate-800 focus:border-[#4A3AFF]/40 focus:bg-white dark:focus:bg-slate-900 rounded-full py-3.5 pl-5 pr-14 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 w-9 h-9 rounded-full bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white flex items-center justify-center transition shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 -rotate-45 -mr-0.5" />
              </button>
            </form>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Follow on:</span>
              <div className="flex items-center gap-3.5 text-slate-800 dark:text-slate-300">
                <Link href="#" aria-label="Facebook" className="hover:text-[#4A3AFF] transition-colors"><Facebook className="w-4 h-4 fill-current" /></Link>
                <Link href="#" aria-label="Twitter X" className="hover:text-[#4A3AFF] transition-colors font-black text-xs">✕</Link>
                <Link href="#" aria-label="LinkedIn" className="hover:text-[#4A3AFF] transition-colors"><Linkedin className="w-4 h-4 fill-current" /></Link>
                <Link href="#" aria-label="YouTube" className="hover:text-[#4A3AFF] transition-colors"><Youtube className="w-4 h-4 fill-current" /></Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Logo & Copyright */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            Copyright 2026 All Rights Reserved Edplus
          </p>
        </div>

      </div>
    </footer>
  );
}

export { SiteFooter };
