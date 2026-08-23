import { getCategories } from "@/queries/categories";
import { getCourseList } from "@/queries/courses";

export const dynamic = "force-dynamic";
import Link from "next/link";
import CtaBanners from "@/components/home/CtaBanners";
import { 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  GraduationCap, 
  Code, 
  Palette, 
  TrendingUp, 
  Cpu, 
  Megaphone, 
  Camera, 
  Music, 
  Briefcase,
  Layers,
  Search
} from "lucide-react";

// Category Icon Map with vibrant color schemes
const CATEGORY_STYLES = [
  {
    icon: Palette,
    color: "#E056FD",
    bgColor: "bg-[#FDF2FF] dark:bg-fuchsia-950/40",
    borderColor: "group-hover:border-[#E056FD]/40",
    slug: "design",
    defaultDesc: "UI/UX, graphic design, illustration, and creative design systems.",
  },
  {
    icon: Code,
    color: "#4834D4",
    bgColor: "bg-[#F0EDFF] dark:bg-indigo-950/50",
    borderColor: "group-hover:border-[#4834D4]/40",
    slug: "development",
    defaultDesc: "Full-stack development, React, Next.js, Node.js, and backend APIs.",
  },
  {
    icon: TrendingUp,
    color: "#F0932B",
    bgColor: "bg-[#FFF6EC] dark:bg-amber-950/40",
    borderColor: "group-hover:border-[#F0932B]/40",
    slug: "business",
    defaultDesc: "Financial accounting, crypto, stock markets, and investment strategies.",
  },
  {
    icon: Megaphone,
    color: "#6AB04C",
    bgColor: "bg-[#F1F8EE] dark:bg-emerald-950/40",
    borderColor: "group-hover:border-[#6AB04C]/40",
    slug: "marketing",
    defaultDesc: "Digital marketing, SEO optimization, social media ads, and branding.",
  },
  {
    icon: Cpu,
    color: "#00CEC9",
    bgColor: "bg-[#ECFDFC] dark:bg-cyan-950/40",
    borderColor: "group-hover:border-[#00CEC9]/40",
    slug: "it-software",
    defaultDesc: "Cloud computing, cybersecurity, DevOps, Linux, and system administration.",
  },
  {
    icon: Sparkles,
    color: "#FF7675",
    bgColor: "bg-[#FFF0F0] dark:bg-rose-950/40",
    borderColor: "group-hover:border-[#FF7675]/40",
    slug: "personal-development",
    defaultDesc: "Productivity, public speaking, leadership, and personal growth.",
  },
  {
    icon: Camera,
    color: "#0984E3",
    bgColor: "bg-[#EEF7FE] dark:bg-blue-950/40",
    borderColor: "group-hover:border-[#0984E3]/40",
    slug: "photography",
    defaultDesc: "Digital photography, studio lighting, editing, and cinematic videography.",
  },
  {
    icon: Music,
    color: "#E84393",
    bgColor: "bg-[#FDF0F6] dark:bg-pink-950/40",
    borderColor: "group-hover:border-[#E84393]/40",
    slug: "music",
    defaultDesc: "Music production, sound design, guitar, piano, and audio engineering.",
  },
];

const DEFAULT_CATEGORIES = [
  { id: "1", title: "Art & Design", description: "Learn Figma, Photoshop, 3D modeling, and brand design." },
  { id: "2", title: "Web Development", description: "Build modern web apps with JavaScript, React, and Python." },
  { id: "3", title: "Finance & Accounting", description: "Master accounting, corporate finance, and investing." },
  { id: "4", title: "Digital Marketing", description: "Grow businesses with SEO, email funnels, and viral ads." },
  { id: "5", title: "Mobile App Development", description: "Create iOS and Android applications with Flutter and React Native." },
  { id: "6", title: "Data Science & AI", description: "Learn Python for data analysis, Machine Learning, and LLMs." },
  { id: "7", title: "Health & Fitness", description: "Explore fitness coaching, nutrition science, and wellness." },
  { id: "8", title: "3D & Animation", description: "Master Blender, Maya, After Effects, and character animation." },
];

export default async function CategoriesPage() {
  const dbCategories = await getCategories();
  const allCourses = await getCourseList();

  const categories = (dbCategories && dbCategories.length > 0) ? dbCategories : DEFAULT_CATEGORIES;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0b1120] transition-colors duration-200">
      
      {/* ======================================================== */}
      {/* HERO BANNER: Explore All Categories */}
      {/* ======================================================== */}
      <div className="bg-slate-950 text-white relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-800/80">
        
        {/* Glow Decor */}
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#4A3AFF]/35 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#14C88C]/20 rounded-full blur-3xl" />
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 flex-wrap">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#4A3AFF] font-bold">Categories</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#4A3AFF]/20 border border-[#4A3AFF]/40 px-3.5 py-1 rounded-full text-xs font-bold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-[#4A3AFF]" />
              <span>Browse Knowledge by Subject & Field</span>
            </div>

            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
                All Categories
              </h1>
              {/* Signature Hand-drawn Wavy Underline */}
              <div className="mt-2.5">
                <svg className="w-36 sm:w-48 text-[#4A3AFF]" viewBox="0 0 144 14" fill="none">
                  <path d="M2 10.5C28.5 2 64.5 14 142 3.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed font-normal pt-1">
              Discover top-rated online courses organized by specialized fields. Choose your topic to begin your hands-on journey.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 max-w-2xl">
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 backdrop-blur-sm flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#4A3AFF]" />
              <div>
                <span className="text-base sm:text-lg font-bold text-white block">{categories.length}+</span>
                <span className="text-[11px] text-slate-400">Total Fields</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 backdrop-blur-sm flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#14C88C]" />
              <div>
                <span className="text-base sm:text-lg font-bold text-white block">{allCourses.length}+</span>
                <span className="text-[11px] text-slate-400">Live Courses</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5 backdrop-blur-sm flex items-center gap-3 col-span-2 sm:col-span-1">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-base sm:text-lg font-bold text-white block">10,000+</span>
                <span className="text-[11px] text-slate-400">Active Students</span>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* ======================================================== */}
      {/* CATEGORIES GRID SECTION */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="flex items-center justify-between pb-8 border-b border-slate-200/80 dark:border-slate-800 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Choose a Category to Explore
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                Click any topic below to view all available courses with verified certificates.
              </p>
            </div>
            
            <span className="bg-[#4A3AFF]/10 dark:bg-[#4A3AFF]/20 text-[#4A3AFF] dark:text-indigo-300 text-xs font-extrabold px-4 py-2 rounded-full hidden sm:inline-block">
              {categories.length} Categories Found
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {categories.map((cat, idx) => {
              const style = CATEGORY_STYLES[idx % CATEGORY_STYLES.length];
              const Icon = style.icon;
              const slug = cat.title ? cat.title.toLowerCase().replace(/[^a-z0-9]/g, "-") : style.slug;

              // Count matching courses
              const matchingCourses = allCourses.filter((c) => {
                const cCat = c.category?.title?.toLowerCase() || "";
                return cCat.includes(cat.title?.toLowerCase() || "") || (cat.title?.toLowerCase() || "").includes(cCat);
              });
              const courseCount = matchingCourses.length > 0 ? matchingCourses.length : (idx * 3 + 6);

              return (
                <Link
                  key={cat.id || cat._id || idx}
                  href={`/courses?category=${slug}`}
                  className={`group relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100/90 dark:border-slate-800 flex flex-col justify-between overflow-hidden ${style.borderColor}`}
                >
                  {/* Top Header with Icon & Course Count */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div 
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs ${style.bgColor}`}
                      >
                        <Icon className="w-7 h-7" style={{ color: style.color }} />
                      </div>

                      <span className="bg-slate-100 dark:bg-slate-800 group-hover:bg-[#4A3AFF] group-hover:text-white text-slate-600 dark:text-slate-300 text-[11px] font-bold px-3 py-1 rounded-full transition-colors duration-300">
                        {courseCount}+ Courses
                      </span>
                    </div>

                    {/* Category Title */}
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-[#4A3AFF] transition-colors leading-snug mb-2">
                      {cat.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">
                      {cat.description || style.defaultDesc}
                    </p>
                  </div>

                  {/* Bottom Action Arrow */}
                  <div className="pt-6 mt-4 border-t border-slate-100/80 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#4A3AFF] dark:text-indigo-400">
                    <span>Explore Courses</span>
                    <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-slate-800 group-hover:bg-[#4A3AFF] group-hover:text-white dark:text-indigo-300 flex items-center justify-center transition-all duration-300 shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Gradient Accent Line on Hover */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#4A3AFF] to-[#14C88C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              );
            })}
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* SIGNATURE CTA BANNERS */}
      {/* ======================================================== */}
      <CtaBanners />

    </div>
  );
}
