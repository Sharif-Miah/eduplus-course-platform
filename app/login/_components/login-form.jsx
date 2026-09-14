"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ceredntialLogin, doSocialLogin } from "@/app/actions";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, BookOpen, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/courses";

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await ceredntialLogin(formData);

      if (response?.error) {
        console.error(response.error);
        setError(response.error);
      } else {
        window.location.href = callbackUrl;
      }
    } catch (e) {
      setError(e.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto">
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
              <BookOpen className="w-3 h-3" />
              <span>Welcome Back</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Login to EduPlus
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Access your enrolled courses, quizzes, and learning dashboard.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold rounded-2xl p-3.5 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-slate-700">Email Address</Label>
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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-slate-700">Password</Label>
            </div>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white text-sm font-extrabold py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-xs text-slate-400 font-bold uppercase tracking-wider absolute">
            or continue with
          </span>
        </div>

        {/* Google Social Login */}
        <form action={doSocialLogin}>
          <button
            type="submit"
            name="action"
            value="google"
            className="w-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold py-3 rounded-2xl flex items-center justify-center gap-2.5 transition shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Bottom Registration Links */}
        <div className="pt-2 text-center text-xs text-slate-500 font-medium space-y-1">
          <p>Don&apos;t have an account yet?</p>
          <div className="flex items-center justify-center gap-3 font-bold text-[#4A3AFF]">
            <Link href="/register/student" className="hover:underline">
              Register as Student
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/register/instructor" className="hover:underline text-emerald-600">
              Register as Instructor
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
