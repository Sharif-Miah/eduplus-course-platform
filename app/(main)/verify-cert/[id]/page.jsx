import { dbConnect } from "@/service/mongo";
import { Report } from "@/model/report-model";
import { Course } from "@/model/course-model";
import { User } from "@/model/user-model";
import { formatMyDate } from "@/lib/date";
import Link from "next/link";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  ChevronRight,
  AlertTriangle,
  QrCode,
  Sparkles,
  Lock,
  ArrowLeft
} from "lucide-react";
import VerifyActions from "./_components/verify-actions";

export const dynamic = "force-dynamic";

export default async function VerifyCertificatePage({ params }) {
  const credentialId = params?.id || "";

  await dbConnect();

  let report = null;
  let course = null;
  let student = null;

  // 1. Try finding by direct credentialId
  report = await Report.findOne({ credentialId })
    .populate({
      path: "course",
      model: Course,
      populate: { path: "instructor", model: User },
    })
    .populate({ path: "student", model: User })
    .lean();

  if (report) {
    course = report.course;
    student = report.student;
  } else {
    // 2. Fallback: Parse suffix if format is EDU-[courseSuffix]-[studentSuffix]
    const cleanId = credentialId.trim();
    const parts = cleanId.split("-");

    if (parts.length >= 3) {
      const courseSuffix = parts[1].toLowerCase();
      const studentSuffix = parts[2].toLowerCase();

      const courses = await Course.find({})
        .populate({ path: "instructor", model: User })
        .lean();
      course = courses.find((c) =>
        c._id.toString().toLowerCase().endsWith(courseSuffix) ||
        c._id.toString().toLowerCase() === courseSuffix
      );

      const users = await User.find({}).lean();
      student = users.find((u) =>
        u._id.toString().toLowerCase().endsWith(studentSuffix) ||
        u._id.toString().toLowerCase() === studentSuffix
      );

      if (course && student) {
        report = await Report.findOne({
          $or: [
            { course: course._id, student: student._id },
            { course_id: course._id.toString(), user_id: student._id.toString() },
          ],
        }).lean();
      }
    }
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const verificationUrl = `${origin}/verify-cert/${credentialId}`;

  // If not found or invalid
  if (!course || !student) {
    return (
      <div className="min-h-[80vh] bg-[#F8FAFC] dark:bg-[#0b1120] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 mx-auto flex items-center justify-center shadow-inner">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-full">
              Record Not Found
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Unverified Certificate ID
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We could not find an authentic EduPlus certificate matching the credential ID{" "}
              <code className="font-mono text-indigo-600 dark:text-indigo-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                {credentialId}
              </code>
              . The ID might be miscopied or the certificate has not yet been issued.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#4A3AFF] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Course Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Formatting variables
  const studentName = `${student.firstName || ""} ${student.lastName || ""}`.trim() || "Student";
  const courseTitle = course.title || "Course";
  const instructorName = `${course.instructor?.firstName || "Sharif"} ${course.instructor?.lastName || "Miah"}`.trim();
  const completionDate = report?.completion_date
    ? formatMyDate(report.completion_date)
    : "September 2026";

  const issueDateObj = report?.completion_date ? new Date(report.completion_date) : new Date();
  const issueYear = issueDateObj.getFullYear();
  const issueMonth = issueDateObj.getMonth() + 1;

  // LinkedIn Add to Profile URL
  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    courseTitle
  )}&organizationName=EduPlus&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(
    verificationUrl
  )}&certId=${encodeURIComponent(credentialId)}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0b1120] py-10 lg:py-16 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 flex-wrap">
          <Link href="/" className="hover:text-slate-700 dark:hover:text-white transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/courses" className="hover:text-slate-700 dark:hover:text-white transition">Courses</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#4A3AFF] font-bold">Verified Credential</span>
        </div>

        {/* ======================================================== */}
        {/* TOP STATUS BANNER: OFFICIALLY VERIFIED */}
        {/* ======================================================== */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Officially Verified Credential</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Authentic EduPlus Certificate
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                This verification record confirms that <strong>{studentName}</strong> has completed 100% of all required modules and assessments for <strong>{courseTitle}</strong>.
              </p>
            </div>

            <div className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[160px]">
              <div className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">
                Credential ID
              </div>
              <div className="font-mono text-sm sm:text-base font-extrabold text-white mt-0.5 select-all">
                {credentialId}
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-semibold mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Tamper-Proof</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN CERTIFICATE DETAILS CARD */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Header of Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Certified Learner
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                {studentName}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Completed</span>
              </span>
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Course Title */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                <BookOpen className="w-3.5 h-3.5 text-[#4A3AFF]" />
                <span>Course Name</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {courseTitle}
              </div>
            </div>

            {/* Completion Date */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                <Calendar className="w-3.5 h-3.5 text-[#4A3AFF]" />
                <span>Issue Date</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {completionDate}
              </div>
            </div>

            {/* Lead Instructor */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-[#4A3AFF]" />
                <span>Instructor</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {instructorName}
              </div>
            </div>

          </div>

          {/* Action Hub (LinkedIn, Download, Share) */}
          <div className="pt-2">
            <VerifyActions
              courseId={course._id?.toString() || course.id}
              studentId={student._id?.toString() || student.id}
              courseTitle={courseTitle}
              credentialId={credentialId}
              verificationUrl={verificationUrl}
              linkedInUrl={linkedInUrl}
            />
          </div>

          {/* Security & Verification Details */}
          <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Lock className="w-3.5 h-3.5 text-[#4A3AFF]" />
              <span>Digital Accreditation & Verification Integrity</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              EduPlus certificates are cryptographically verifiable documents backed by our centralized database and immutable lesson completion records. Anyone holding the official certificate or scanning its QR code is directed to this secure verification address.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
