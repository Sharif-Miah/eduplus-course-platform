import { getCategories } from "@/queries/categories";
import { getCourseList } from "@/queries/courses";

export const dynamic = "force-dynamic";

import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import AboutExperienceSection from "@/components/home/AboutExperienceSection";
import LiveClassesAndPopularCourses from "@/components/home/LiveClassesAndPopularCourses";
import HowItWorksAndTestimonials from "@/components/home/HowItWorksAndTestimonials";
import InstructorsAndPartners from "@/components/home/InstructorsAndPartners";
import LatestNewsSection from "@/components/home/LatestNewsSection";
import CtaBanners from "@/components/home/CtaBanners";
import ScrollToTop from "@/components/home/ScrollToTop";

const HomePage = async () => {
    let courses = [];
    let categories = [];
    try {
        courses = await getCourseList();
    } catch (e) {
        console.error("Error fetching courses in HomePage:", e);
    }
    try {
        categories = await getCategories();
    } catch (e) {
        console.error("Error fetching categories in HomePage:", e);
    }

    return (
        <div className="w-full flex flex-col">
            {/* 1. Hero Section */}
            <HeroSection featuredCourse={courses?.[0]} />

            {/* 2. Top Categories Section */}
            <CategorySection categories={categories} />

            {/* 3. About Our EdPlus & Media Experience + Stats Bar */}
            <AboutExperienceSection />

            {/* 4. Live Classes & Most Popular Courses */}
            <LiveClassesAndPopularCourses courses={courses} />

            {/* 5. Working Process / How It Works & Testimonials */}
            <HowItWorksAndTestimonials />

            {/* 6. Our Expert Instructors & Brand Partners Marquee */}
            <InstructorsAndPartners />

            {/* 7. Latest News & Blog Section */}
            <LatestNewsSection />

            {/* 8. Call To Action Promo Banners (Get Free Courses & Become a Tutor) */}
            <CtaBanners />

            {/* Scroll To Top Button */}
            <ScrollToTop />
        </div>
    );
};

export default HomePage;
