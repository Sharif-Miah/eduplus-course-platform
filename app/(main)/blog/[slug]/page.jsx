export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar, Share2, ArrowLeft, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import { BLOG_POSTS } from "@/lib/blog-data";
import CtaBanners from "@/components/home/CtaBanners";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams?.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.author?.name === post.author?.name)
  ).slice(0, 2);

  return (
    <article className="min-h-screen bg-[#F8FAFC]">
      
      {/* ======================================================== */}
      {/* 1. ARTICLE HERO HEADER */}
      {/* ======================================================== */}
      <section className="bg-slate-950 text-white relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden border-b border-slate-800/80">
        
        {/* Glow Decor */}
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#4A3AFF]/35 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#14C88C]/20 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 flex-wrap">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/blog" className="hover:text-white transition">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#4A3AFF] font-bold truncate max-w-xs">{post.category}</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#4A3AFF] text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-md">
                {post.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#4A3AFF]" />
                <span>{post.readTime}</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#14C88C]" />
                <span>{post.publishedDate}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {post.description}
            </p>
          </div>

          {/* Author bar */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#4A3AFF]/40">
                <Image
                  src={post.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"}
                  alt={post.author?.name || "Author"}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{post.author?.name}</p>
                <p className="text-xs text-slate-400 font-medium">{post.author?.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {(post.tags || []).map((tag, i) => (
                <span
                  key={i}
                  className="bg-slate-900 border border-slate-700/80 text-slate-300 text-[11px] font-bold px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ======================================================== */}
      {/* 2. COVER IMAGE & ARTICLE BODY */}
      {/* ======================================================== */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100 mb-10 bg-slate-100">
          <Image
            src={getImageUrl(post.image, "courses")}
            alt={post.title || "Blog cover"}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Rich Article Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-8 text-slate-800 leading-relaxed text-sm sm:text-base font-normal">
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {post.description}
            </p>

            <div className="bg-indigo-50/70 border-l-4 border-[#4A3AFF] p-5 rounded-2xl space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4A3AFF]" />
                Key Takeaways from this Guide:
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc pl-5 font-medium">
                <li>Hands-on practical implementation with production patterns</li>
                <li>Best practices for scalable code design and clean abstractions</li>
                <li>Real-world case studies and performance optimization tips</li>
              </ul>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight pt-4">
              1. Understanding the Core Principles
            </h2>
            <p className="text-slate-600 leading-relaxed">
              When building modern applications in 2026, software architects prioritize modularity, responsive UX, and performant backend APIs. Writing clean, declarative code allows engineering teams to scale velocity while maintaining stability.
            </p>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight pt-4">
              2. Best Practices & Practical Application
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Always test edge cases early and automate regression suites. Utilizing strongly-typed schemas and standardizing UI design tokens guarantees seamless collaboration across design and development teams.
            </p>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-3 mt-6">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span>Architecture Example</span>
                <span className="text-[#14C88C]">JavaScript / React 19</span>
              </div>
              <pre className="text-xs sm:text-sm font-mono overflow-x-auto text-indigo-300">
{`// Modern Declarative Hook Pattern
export function useFeatureResource(resourceId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource(resourceId).then(setData).finally(() => setLoading(false));
  }, [resourceId]);

  return { data, loading };
}`}
              </pre>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight pt-4">
              3. Conclusion and Next Steps
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Continuous learning is the cornerstone of professional growth in tech. Experiment with these concepts in your local workspace and incorporate them into your next production project.
            </p>
          </div>

          {/* Share and Tags footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4A3AFF] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Share this article</span>
            </div>
          </div>
        </div>

      </div>


      {/* ======================================================== */}
      {/* 3. RELATED ARTICLES */}
      {/* ======================================================== */}
      {relatedPosts.length > 0 && (
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Related Articles & Guides
            </h3>
            <Link href="/blog" className="text-xs font-bold text-[#4A3AFF] hover:underline">
              View all articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.slug}
                href={`/blog/${rPost.slug}`}
                className="group bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={getImageUrl(rPost.image, "courses")}
                      alt={rPost.title || "Related post thumbnail"}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#4A3AFF] transition-colors line-clamp-2 mb-2">
                    {rPost.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">
                    {rPost.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#4A3AFF]">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}


      {/* ======================================================== */}
      {/* 4. SIGNATURE CTA BANNERS */}
      {/* ======================================================== */}
      <CtaBanners />

    </article>
  );
}
