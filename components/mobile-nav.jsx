"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/use-lock-body";
import { useSession, signOut } from "next-auth/react";
import { User, BookOpen, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function MobileNav({ items, onClose, children }) {
  useLockBody();

  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;
  const isInstructor =
    session?.user?.role?.toLowerCase() === "instructor" ||
    session?.user?.role?.toLowerCase() === "teacher";

  return (
    <div
      className={cn(
        "fixed inset-0 top-20 z-40 bg-black/60 backdrop-blur-xs p-4 sm:p-6 lg:hidden animate-in fade-in duration-200"
      )}
      onClick={onClose}
    >
      <div 
        className="relative z-50 rounded-3xl bg-white dark:bg-[#0f172a] p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6 max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Links */}
        <nav className="grid grid-flow-row auto-rows-max gap-1">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              onClick={onClose}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50/70 dark:hover:bg-slate-800 hover:text-[#4A3AFF] transition-all",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              <span>{item.title}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
            </Link>
          ))}
        </nav>

        {/* Theme Switcher Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Theme Mode</span>
          <ThemeToggle />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800" />

        {/* Auth Buttons */}
        {!isAuthenticated ? (
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Link
              href="/login"
              onClick={onClose}
              className="w-full text-center py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Login
            </Link>
            <Link
              href="/register/student"
              onClick={onClose}
              className="w-full text-center py-3 px-4 rounded-2xl bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white text-xs font-extrabold shadow-md shadow-indigo-500/25 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{session.user.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{session.user.email}</p>
            </div>

            <div className="grid grid-cols-1 gap-1 pt-1">
              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-[#4A3AFF]"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Profile</span>
              </Link>
              <Link
                href="/account/enrolled-courses"
                onClick={onClose}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-[#4A3AFF]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>My Enrolled Courses</span>
              </Link>
              {isInstructor && (
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-[#4A3AFF]"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Instructor Dashboard</span>
                </Link>
              )}
              <button
                onClick={async () => {
                  if (onClose) onClose();
                  try {
                    await signOut({ callbackUrl: "/", redirect: false });
                  } catch (err) {
                    console.error("SignOut error:", err);
                  } finally {
                    window.location.href = "/";
                  }
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 w-full text-left cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
