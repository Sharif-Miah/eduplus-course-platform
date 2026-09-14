"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  Video,
  Award,
  CreditCard,
  Layers,
  Code2,
  Users,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const DOC_SECTIONS = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Sparkles,
    articles: [
      { id: "overview", title: "Platform Overview" },
      { id: "account-setup", title: "Creating an Account" },
      { id: "course-discovery", title: "Finding the Right Course" },
    ],
  },
  {
    id: "student-guide",
    title: "Student Guide",
    icon: GraduationCap,
    articles: [
      { id: "learning-lessons", title: "Watching Video Lessons" },
      { id: "taking-quizzes", title: "Taking Quizzes & Tests" },
      { id: "course-progress", title: "Tracking Your Progress" },
      { id: "download-certificate", title: "Certificates & Verification" },
    ],
  },
  {
    id: "instructor-guide",
    title: "Instructor Guide",
    icon: Users,
    articles: [
      { id: "instructor-onboarding", title: "Becoming an Instructor" },
      { id: "create-course", title: "Creating & Publishing Courses" },
      { id: "manage-modules", title: "Structuring Modules & Lessons" },
      { id: "quizzes-and-reports", title: "Quiz Creation & Reports" },
      { id: "revenue-payouts", title: "Earnings & Revenue Analytics" },
    ],
  },
  {
    id: "billing-payments",
    title: "Billing & Stripe",
    icon: CreditCard,
    articles: [
      { id: "stripe-checkout", title: "Secure Checkout & Pricing" },
      { id: "invoices-receipts", title: "Invoices & Payment History" },
      { id: "refund-policy", title: "14-Day Refund Policy" },
    ],
  },
  {
    id: "verification-api",
    title: "Verification & API",
    icon: Code2,
    articles: [
      { id: "certificate-qr", title: "Certificate QR & Hash System" },
      { id: "platform-architecture", title: "Tech Stack & Architecture" },
    ],
  },
];

export default function DocsPage() {
  const [activeArticleId, setActiveArticleId] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Docs Header */}
      <section className="border-b bg-muted/40 py-10 md:py-14 grainy">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <Badge variant="outline" className="bg-background/80 mb-3 px-3 py-1 font-semibold">
            EduPlus Knowledge Base & Guides
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground font-heading">
            Documentation & User Guides
          </h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about learning, teaching, taking quizzes, and earning certificates on EduPlus.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-lg mx-auto relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search documentation, certificates, quizzes, instructor setup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-background/90 shadow-sm rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Main Docs Layout */}
      <div className="container max-w-7xl mx-auto px-4 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 border rounded-2xl p-5 bg-card shadow-sm sticky top-28 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 px-2">
                Documentation Menu
              </p>
              <nav className="space-y-4">
                {DOC_SECTIONS.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <div key={sec.id} className="space-y-1">
                      <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-bold text-foreground">
                        <Icon className="w-4 h-4 text-sky-600" />
                        <span>{sec.title}</span>
                      </div>
                      <div className="pl-6 space-y-0.5 border-l-2 ml-3 border-border">
                        {sec.articles.map((art) => (
                          <button
                            key={art.id}
                            onClick={() => setActiveArticleId(art.id)}
                            className={cn(
                              "w-full text-left text-xs py-1.5 px-2 rounded-md transition-colors block",
                              activeArticleId === art.id
                                ? "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                          >
                            {art.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t">
              <div className="rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground mb-1">Need Instructor Access?</p>
                <p className="mb-2">Create an instructor account to build courses & quizzes.</p>
                <Link
                  href="/register/instructor"
                  className="text-sky-600 font-bold hover:underline inline-flex items-center gap-1"
                >
                  Join as Instructor <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="lg:col-span-9 border rounded-2xl p-6 md:p-10 bg-card shadow-sm">
            {/* 1. Overview */}
            {activeArticleId === "overview" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> Getting Started
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Platform Overview
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Welcome to <strong>EduPlus</strong>, the next-generation e-learning platform built for modern programmers, designers, and tech professionals. EduPlus combines high-definition video lessons, interactive quizzes, automated progress tracking, verified certificates, and a full-featured instructor management system.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="rounded-xl border p-4 bg-muted/20">
                    <Video className="w-6 h-6 text-sky-600 mb-2" />
                    <h4 className="font-bold text-sm text-foreground">Curated Video Courses</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Structured curriculum with downloadable resources and code examples.
                    </p>
                  </div>
                  <div className="rounded-xl border p-4 bg-muted/20">
                    <FileText className="w-6 h-6 text-indigo-600 mb-2" />
                    <h4 className="font-bold text-sm text-foreground">Interactive Quizzes</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Test your understanding at the end of each module with real-time scoring.
                    </p>
                  </div>
                  <div className="rounded-xl border p-4 bg-muted/20">
                    <Award className="w-6 h-6 text-emerald-600 mb-2" />
                    <h4 className="font-bold text-sm text-foreground">Verified Certificates</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Accredited completion certificates shareable on LinkedIn and portfolios.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border-l-4 border-sky-500 bg-sky-50 dark:bg-sky-950/30 p-4 text-xs md:text-sm text-foreground">
                  <strong>Pro Tip:</strong> You can browse all available categories and courses without an account, but you must register as a Student or Instructor to enroll and track progress.
                </div>
              </div>
            )}

            {/* 2. Account Setup */}
            {activeArticleId === "account-setup" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  <Users className="w-4 h-4" /> Getting Started
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Creating an Account (Student vs. Instructor)
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  EduPlus supports two specialized account roles tailored to different user journeys:
                </p>

                <div className="space-y-4">
                  <div className="rounded-2xl border p-5 bg-card">
                    <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-sky-600" /> Student Account
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enables you to browse courses, enroll via Stripe secure checkout, watch video lessons, take quizzes, and access your personal learning dashboard at <code>/account/enrolled-courses</code>.
                    </p>
                    <Link
                      href="/register/student"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline"
                    >
                      Register as Student <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="rounded-2xl border p-5 bg-card">
                    <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" /> Instructor Account
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enables educators to create and publish courses, upload video lessons, manage modules, configure quiz sets, monitor enrollments, and track revenue at <code>/dashboard</code>.
                    </p>
                    <Link
                      href="/register/instructor"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline"
                    >
                      Register as Instructor <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Course Discovery */}
            {activeArticleId === "course-discovery" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" /> Getting Started
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Finding the Right Course
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Our catalog is organized by categories including Web Development, Python & AI, UI/UX Design, Data Science, and Marketing.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-foreground">Filter by Category & Price</h5>
                      <p className="text-xs text-muted-foreground">Browse through beginner, intermediate, and advanced tracks.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-foreground">Inspect Curriculum & Instructor Details</h5>
                      <p className="text-xs text-muted-foreground">View lesson durations, module structures, and instructor bios before enrolling.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Watching Lessons */}
            {activeArticleId === "learning-lessons" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  <Video className="w-4 h-4" /> Student Guide
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Watching Video Lessons
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Once enrolled in a course, navigate to your <strong>My Courses</strong> page to start streaming lessons.
                </p>

                <div className="rounded-2xl border p-5 bg-muted/20 space-y-3 text-xs md:text-sm">
                  <h4 className="font-bold text-foreground">Video Player Features:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Playback Speed:</strong> 0.75x to 2x speed controls.</li>
                    <li>• <strong>Progress Syncing:</strong> Automatically saves timestamp when you pause or finish a lesson.</li>
                    <li>• <strong>Next/Previous Navigation:</strong> Seamlessly jump between modules.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 5. Taking Quizzes */}
            {activeArticleId === "taking-quizzes" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  <FileText className="w-4 h-4" /> Student Guide
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Taking Quizzes & Tests
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Courses include chapter-end quizzes designed to validate your comprehension of key programming concepts.
                </p>
                <div className="rounded-xl border p-4 bg-card space-y-2 text-xs md:text-sm">
                  <p className="font-bold text-foreground">Quiz Evaluation Rules:</p>
                  <p className="text-muted-foreground">1. Each question offers multiple choice options with only one or multiple correct answers.</p>
                  <p className="text-muted-foreground">2. Upon submission, results and explanation points are immediately calculated.</p>
                  <p className="text-muted-foreground">3. Your quiz score contributes directly to your Course Completion Report.</p>
                </div>
              </div>
            )}

            {/* 6. Course Progress */}
            {activeArticleId === "course-progress" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  <Layers className="w-4 h-4" /> Student Guide
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Tracking Your Course Progress
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  EduPlus automatically tracks completed lessons, watched durations, and quiz submissions.
                </p>
                <div className="rounded-2xl border p-6 bg-slate-900 text-white font-mono text-xs space-y-2">
                  <p className="text-emerald-400">{"// Progress Calculation Algorithm"}</p>
                  <p>Completed Lessons / Total Course Lessons * 100%</p>
                  <p className="text-slate-400">When progress reaches 100% + Quizzes passed = Certificate Unlocked!</p>
                </div>
              </div>
            )}

            {/* 7. Certificates */}
            {activeArticleId === "download-certificate" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  <Award className="w-4 h-4" /> Student Guide
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Certificates & Verification
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Upon completing 100% of a course, you can download an accredited digital certificate in PDF format directly from your course page.
                </p>
                <div className="rounded-2xl border p-6 bg-muted/30 flex items-center gap-4">
                  <Award className="w-10 h-10 text-amber-500 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-foreground">Verified Digital Credential</h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Includes student name, course title, completion date, instructor signature, and a unique cryptographic verification hash.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 8. Instructor Onboarding */}
            {activeArticleId === "instructor-onboarding" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold uppercase tracking-wider">
                  <Users className="w-4 h-4" /> Instructor Guide
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Becoming an Instructor
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Share your expertise with thousands of passionate students worldwide.
                </p>
                <ol className="space-y-3 text-xs md:text-sm text-muted-foreground list-decimal pl-5">
                  <li>Register with an Instructor account at <code>/register/instructor</code>.</li>
                  <li>Complete your public profile with your bio, designation, and social media handles.</li>
                  <li>Access your instructor hub at <code>/dashboard</code>.</li>
                </ol>
              </div>
            )}

            {/* 9. Creating Courses */}
            {activeArticleId === "create-course" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" /> Instructor Guide
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Creating & Publishing Courses
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  From the Instructor Dashboard, click <strong>Add Course</strong> to launch the course creation wizard.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border p-4 bg-card">
                    <h5 className="font-bold text-sm text-foreground">Course Metadata</h5>
                    <p className="text-xs text-muted-foreground mt-1">Title, subtitle, category selection, and pricing.</p>
                  </div>
                  <div className="rounded-xl border p-4 bg-card">
                    <h5 className="font-bold text-sm text-foreground">Media & Thumbnail</h5>
                    <p className="text-xs text-muted-foreground mt-1">High-resolution cover image and promotional video preview.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 10. Manage Modules */}
            {activeArticleId === "manage-modules" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold uppercase tracking-wider">
                  <Layers className="w-4 h-4" /> Instructor Guide
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Structuring Modules & Lessons
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Organize your course into logical modules (e.g. Chapter 1: Introduction, Chapter 2: Deep Dive). Inside each module, you can upload video lessons, attach downloadable exercise files, and mark lessons as Free Preview.
                </p>
              </div>
            )}

            {/* 11. Quizzes & Reports */}
            {activeArticleId === "quizzes-and-reports" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold uppercase tracking-wider">
                  <FileText className="w-4 h-4" /> Instructor Guide
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Quiz Creation & Performance Reports
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Attach quiz sets to courses to assess students. View detailed completion reports, quiz averages, and student performance metrics in real-time.
                </p>
              </div>
            )}

            {/* 12. Revenue & Payouts */}
            {activeArticleId === "revenue-payouts" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-purple-600 font-semibold uppercase tracking-wider">
                  <CreditCard className="w-4 h-4" /> Instructor Guide
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Earnings & Revenue Analytics
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Track your total sales, active student enrollments, and gross revenue directly on your dashboard overview cards.
                </p>
              </div>
            )}

            {/* 13. Stripe Checkout */}
            {activeArticleId === "stripe-checkout" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                  <CreditCard className="w-4 h-4" /> Billing & Stripe
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Secure Checkout & Pricing
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  All transactions on EduPlus are processed securely via Stripe. We do not store your credit card information on our servers.
                </p>
                <div className="rounded-xl border p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 text-xs md:text-sm">
                  ✓ 256-bit SSL encryption <br />
                  ✓ Instant enrollment access upon payment confirmation <br />
                  ✓ Automated invoice delivery to your registered email
                </div>
              </div>
            )}

            {/* 14. Invoices & Receipts */}
            {activeArticleId === "invoices-receipts" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                  <FileText className="w-4 h-4" /> Billing & Stripe
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Invoices & Payment Receipts
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Every successful enrollment creates a Stripe invoice receipt sent directly to your registered email. You can also view your payment records under Account Settings.
                </p>
              </div>
            )}

            {/* 15. Refund Policy */}
            {activeArticleId === "refund-policy" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Billing & Stripe
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  14-Day 100% Refund Policy
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We stand behind the quality of our educational content. If you are not satisfied with your course purchase within the first 14 days and have watched less than 50% of the course, we will issue a full refund.
                </p>
              </div>
            )}

            {/* 16. Certificate QR */}
            {activeArticleId === "certificate-qr" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  <Code2 className="w-4 h-4" /> Verification & API
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Certificate QR & Verification System
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Every certificate issued by EduPlus carries a unique cryptographic ID and public verification URL:
                </p>
                <div className="rounded-xl border p-4 bg-slate-900 text-slate-100 font-mono text-xs">
                  https://educonnect.com/api/certificate?reportId=...
                </div>
                <p className="text-xs text-muted-foreground">
                  Employers and recruiters can verify certificate authenticity in real time without requiring login.
                </p>
              </div>
            )}

            {/* 17. Platform Architecture */}
            {activeArticleId === "platform-architecture" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  <Terminal className="w-4 h-4" /> Verification & API
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-heading">
                  Platform Architecture & Tech Stack
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  EduPlus is engineered using industry-grade modern fullstack standards:
                </p>
                <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                  <p>• <strong>Framework:</strong> Next.js 14+ (App Router, Server Components & Server Actions)</p>
                  <p>• <strong>Database:</strong> MongoDB & Mongoose with singleton connection caching</p>
                  <p>• <strong>Authentication:</strong> NextAuth (Auth.js v5) with JWT session cookies</p>
                  <p>• <strong>Payments:</strong> Stripe Checkout & Webhook event processing</p>
                  <p>• <strong>Styling:</strong> Tailwind CSS & Radix UI accessible primitives</p>
                </div>
              </div>
            )}

            {/* Bottom Help Section */}
            <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20 p-5 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-foreground">Still have questions?</p>
                <p className="text-xs text-muted-foreground">Check out our active developer blog or browse our full course catalog.</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/blog"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  Read Blog
                </Link>
                <Link
                  href="/courses"
                  className={cn(buttonVariants({ size: "sm" }), "bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white")}
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
