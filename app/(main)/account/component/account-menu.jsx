"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, BookOpen, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Personal Profile", href: "/account", icon: User },
  { label: "Enrolled Courses", href: "/account/enrolled-courses", icon: BookOpen },
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <ul className="space-y-1.5 w-full">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 group",
                isActive
                  ? "bg-[#4A3AFF] text-white shadow-lg shadow-indigo-500/25"
                  : "text-slate-600 dark:text-slate-300 hover:bg-indigo-50/70 dark:hover:bg-slate-800 hover:text-[#4A3AFF] dark:hover:text-[#4A3AFF]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-400 group-hover:text-[#4A3AFF]")} />
                <span>{item.label}</span>
              </div>
              <ChevronRight className={cn("w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform", isActive ? "text-white opacity-100" : "")} />
            </Link>
          </li>
        );
      })}

      {/* Sign Out Button */}
      <li className="pt-2">
        <button
          onClick={async () => {
            try {
              await signOut({ callbackUrl: "/", redirect: false });
            } catch (err) {
              console.error("SignOut error:", err);
            } finally {
              window.location.href = "/";
            }
          }}
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all duration-200 group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-rose-400 group-hover:text-rose-600" />
            <span>Sign Out</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </li>
    </ul>
  );
}
