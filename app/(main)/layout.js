import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Categories",
    href: "/#categories",
  },
  {
    title: "Live Classes",
    href: "/#live-classes",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

import { auth } from "@/auth";

const MainLayout = async ({ children }) => {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#0b1120] text-gray-900 dark:text-slate-100 transition-colors duration-200">
      <header className="z-50 bg-white/95 dark:bg-[#0b1120]/95 backdrop-blur-md sticky top-0 left-0 right-0 border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
          <MainNav items={navLinks} session={session} />
        </div>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
};
export default MainLayout;

