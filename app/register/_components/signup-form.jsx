"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Sparkles, ArrowRight, Loader2, AlertCircle, GraduationCap, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function SignupForm({ role }) {
  const router = useRouter();
  const currentRole = role === "instructor" ? "instructor" : "student";
  const [activeRole, setActiveRole] = useState(currentRole);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      const firstName = formData.get("first-name");
      const lastName = formData.get("last-name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }

      setLoading(true);
      const userRole = activeRole;

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          userRole,
        }),
      });

      if (response.status === 201) {
        router.push("/login");
      } else {
        const message = await response.text();
        setError(message || "Registration failed. Please try again.");
      }
    } catch (e) {
      console.error(e.message);
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg w-full mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-7 sm:p-9 shadow-2xl border border-slate-100/90 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          {/* Logo Icon */}
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100/80 mx-auto flex items-center justify-center shadow-xs">
            <svg
              className="w-8 h-8"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 26.5V30.5C14 34 18.5 36.5 24 36.5C29.5 36.5 34 34 34 30.5V26.5C31.5 28.5 27.8 29.5 24 29.5C20.2 29.5 16.5 28.5 14 26.5Z"
                fill="#10B981"
              />
              <path
                d="M24 12L7 20.5L24 29L41 20.5L24 12Z"
                fill="#4A3AFF"
              />
              <path
                d="M11 22.5V32.5C11 34 9 35.5 8 36.5C10 36.5 12 36 12 34V22.5H11Z"
                fill="#4A3AFF"
              />
            </svg>
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center gap-1.5 bg-[#4A3AFF]/10 text-[#4A3AFF] px-3 py-0.5 rounded-full text-xs font-bold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Join EduPlus Community</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Your Account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Start learning or teaching with thousands of students worldwide.
            </p>
          </div>
        </div>

        {/* Role Selector Tabs (Student vs Instructor) */}
        <div className="grid grid-cols-2 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveRole("student")}
            className={cn(
              "flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 cursor-pointer",
              activeRole === "student"
                ? "bg-white text-[#4A3AFF] shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Account</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole("instructor")}
            className={cn(
              "flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 cursor-pointer",
              activeRole === "instructor"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            <Briefcase className="w-4 h-4" />
            <span>Instructor Account</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold rounded-2xl p-3.5 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">First Name <span className="text-rose-500">*</span></Label>
              <input
                id="first-name"
                name="first-name"
                placeholder="e.g. John"
                required
                className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-3 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/30 focus:border-[#4A3AFF] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Last Name <span className="text-rose-500">*</span></Label>
              <input
                id="last-name"
                name="last-name"
                placeholder="e.g. Doe"
                required
                className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-3 px-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/30 focus:border-[#4A3AFF] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-700">Email Address <span className="text-rose-500">*</span></Label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/30 focus:border-[#4A3AFF] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Password <span className="text-rose-500">*</span></Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/30 focus:border-[#4A3AFF] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Confirm Password <span className="text-rose-500">*</span></Label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#4A3AFF]/30 focus:border-[#4A3AFF] transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full text-white text-sm font-extrabold py-3.5 rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60",
                activeRole === "instructor"
                  ? "bg-[#14C88C] hover:bg-[#0fa874] shadow-emerald-500/20"
                  : "bg-[#4A3AFF] hover:bg-[#3D2FE6] shadow-indigo-500/25"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create {activeRole === "instructor" ? "Instructor" : "Student"} Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Bottom Login Link */}
        <div className="pt-2 text-center text-xs text-slate-500 font-medium">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-[#4A3AFF] hover:underline">
            Log in to Account
          </Link>
        </div>

      </div>
    </div>
  );
}
