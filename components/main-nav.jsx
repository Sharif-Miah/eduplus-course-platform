"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";
import { Logo } from "./logo";
import { X, Menu, Search, ShoppingBag, ChevronDown, User, BookOpen, LogOut, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export function MainNav({ items, children }) {
  const { data: session, status } = useSession();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }

  useEffect(() => {
    if (session?.user) {
      async function fetchMe() {
        try {
          const response = await fetch("/api/me");
          if (response.ok) {
            const data = await response.json();
            setLoggedInUser(data);
          }
        } catch (err) {
          console.error(err);
        }
      }
      fetchMe();
    } else {
      setLoggedInUser(null);
    }
  }, [session]);

  const isAuthenticated = status === "authenticated" && !!session?.user;
  const isInstructor =
    session?.user?.role?.toLowerCase() === "instructor" ||
    session?.user?.role?.toLowerCase() === "teacher" ||
    loggedInUser?.role?.toLowerCase() === "instructor" ||
    loggedInUser?.role?.toLowerCase() === "teacher";

  const handleLogout = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    try {
      await signOut({ callbackUrl: "/", redirect: false });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <div className="w-full flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-8 lg:gap-12">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-semibold text-gray-800 dark:text-slate-200 hover:text-[#4A3AFF] dark:hover:text-[#4A3AFF] transition-colors"
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-[#4A3AFF] dark:hover:text-[#4A3AFF] transition-colors outline-none cursor-pointer">
                <span>Courses</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-1.5 border border-slate-100 dark:border-slate-800">
              <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2 px-3 text-xs font-bold focus:bg-indigo-50 dark:focus:bg-slate-800 focus:text-[#4A3AFF] dark:text-slate-200">
                <Link href="/courses">All Courses</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-xl cursor-pointer py-2 px-3 text-xs font-bold focus:bg-indigo-50 dark:focus:bg-slate-800 focus:text-[#4A3AFF] dark:text-slate-200">
                <Link href="/categories">All Categories</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/blog"
            className="text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-[#4A3AFF] dark:hover:text-[#4A3AFF] transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-[#4A3AFF] dark:hover:text-[#4A3AFF] transition-colors"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-[#4A3AFF] dark:hover:text-[#4A3AFF] transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        
        {/* Search Bar / Trigger - hidden on mobile */}
        <div className="relative hidden sm:block">
          {searchOpen ? (
            <div className="flex items-center bg-gray-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-full px-3 py-1.5 animate-in fade-in">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/courses?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="bg-transparent text-xs sm:text-sm focus:outline-none w-28 sm:w-44 text-gray-800 dark:text-slate-100 placeholder:text-slate-400"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 ml-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-50 dark:bg-slate-800/90 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200/80 dark:border-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition cursor-pointer shadow-xs"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Cart / My Courses Icon - hidden on mobile */}
        <Link
          href={isAuthenticated ? "/account/enrolled-courses" : "/courses"}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-50 dark:bg-slate-800/90 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200/80 dark:border-slate-700 hidden sm:flex items-center justify-center text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition shadow-xs"
          title="Enrolled Courses"
        >
          <ShoppingBag className="w-4 h-4" />
        </Link>

        {/* Sun / Moon Theme Toggle - hidden on mobile */}
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        {/* AUTH BUTTONS SECTION: When Logged Out vs When Logged In */}
        {!isAuthenticated ? (
          <div className="flex items-center gap-2">
            {/* Login Button */}
            <Link
              href="/login"
              className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-[#4A3AFF] px-3.5 py-2 rounded-full hover:bg-indigo-50/60 dark:hover:bg-slate-800 transition"
            >
              Login
            </Link>

            {/* Register Dropdown Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1.5 bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 rounded-full shadow-md shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  <span>Register</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2 rounded-2xl p-1.5 shadow-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <DropdownMenuItem className="cursor-pointer rounded-xl text-xs font-bold py-2.5 px-3 focus:bg-indigo-50 dark:focus:bg-slate-800 focus:text-[#4A3AFF] dark:text-slate-200" asChild>
                  <Link href="/register/student">Student Registration</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-xl text-xs font-bold py-2.5 px-3 focus:bg-emerald-50 dark:focus:bg-emerald-950/60 focus:text-emerald-700 dark:focus:text-emerald-400 dark:text-slate-200" asChild>
                  <Link href="/register/instructor">Instructor Registration</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          /* User Profile Dropdown Menu */
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <Avatar className="h-9 w-9 ring-2 ring-[#4A3AFF]/30 shadow-xs">
                  <AvatarImage
                    src={loggedInUser?.profilePicture || session?.user?.image}
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback className="bg-[#4A3AFF] text-white text-xs font-bold">
                    {(session?.user?.name || "U").substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-1.5 shadow-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {session?.user?.name || `${loggedInUser?.firstName || ""} ${loggedInUser?.lastName || ""}`}
                </p>
                <p className="text-[11px] text-slate-400 truncate">{session?.user?.email}</p>
              </div>

              <DropdownMenuItem className="cursor-pointer rounded-xl text-xs font-bold py-2 px-3 focus:bg-indigo-50 dark:focus:bg-slate-800 focus:text-[#4A3AFF] dark:text-slate-200" asChild>
                <Link href="/account" className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer rounded-xl text-xs font-bold py-2 px-3 focus:bg-indigo-50 dark:focus:bg-slate-800 focus:text-[#4A3AFF] dark:text-slate-200" asChild>
                <Link href="/account/enrolled-courses" className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>My Courses</span>
                </Link>
              </DropdownMenuItem>

              {isInstructor && (
                <DropdownMenuItem className="cursor-pointer rounded-xl text-xs font-bold py-2 px-3 focus:bg-indigo-50 dark:focus:bg-slate-800 focus:text-[#4A3AFF] dark:text-slate-200" asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Instructor Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator className="my-1 bg-slate-100 dark:bg-slate-800" />

              <DropdownMenuItem
                className="cursor-pointer rounded-xl text-xs font-bold py-2 px-3 text-rose-600 dark:text-rose-400 focus:bg-rose-50 dark:focus:bg-rose-950/40 focus:text-rose-700"
                onSelect={handleLogout}
                onClick={handleLogout}
              >
                <div className="flex items-center gap-2 w-full">
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Mobile Hamburger Toggle */}
        <button
          className="p-2 rounded-xl text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {showMobileMenu && items && (
        <MobileNav items={items} onClose={() => setShowMobileMenu(false)}>{children}</MobileNav>
      )}
    </div>
  );
}
