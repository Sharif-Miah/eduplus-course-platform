import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import RelatedCourses from "./_components/RelatedCourses";
import { getCourseDetails, getCourseList } from "@/queries/courses";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const SingleCoursePage = async ({ params: { id } }) => {
  const [course, allCourses] = await Promise.all([
    getCourseDetails(id),
    getCourseList(),
  ]);

  if (!course) {
    notFound();
  }

  const relatedCourses = (allCourses || []).filter(
    (c) => (c.id || c._id?.toString()) !== id
  );

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-[#0b1120] transition-colors duration-200">
      {/* 1. Hero Banner with Title, Badges, Breadcrumbs, Instructor Pill */}
      <CourseDetailsIntro course={course} />

      {/* 2. Main 2-Column Content: Media Preview, Interactive Tabs, & Sticky Enrollment Card */}
      <CourseDetails course={course} />

      {/* 3. Related Courses Carousel / Grid */}
      <RelatedCourses courses={relatedCourses} />
    </div>
  );
};

export default SingleCoursePage;

