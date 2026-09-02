import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import { Testimonial } from "@/model/testimonial-model";
import { Module } from "@/model/module.model";
import { Lesson } from "@/model/lesson.model";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";

import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";

import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";
import { dbConnect } from "@/service/mongo";

export async function getCourseList() {
    await dbConnect();
    const courses = await Course.find({active:true}).select(["title", "subtitle", "thumbnail", "modules", "price", "category", "instructor", "testimonials", "createdOn", "modifiedOn"]).populate({
        path: "category",
        model: Category
    }).populate({
        path: "instructor",
        model: User
    }).populate({
        path: "testimonials",
        model: Testimonial
    }).populate({
        path: "modules",
        model: Module
    }).lean();
    return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id) {
    try {
        await dbConnect();
        const course = await Course.findById(id)
        .populate({
            path: "category",
            model: Category
        }).populate({
            path: "instructor",
            model: User
        }).populate({
            path: "testimonials",
            model: Testimonial,
            populate: {
                path: "user",
                model: User
            }
        }).populate({
            path: "modules",
            model: Module,
            populate: {
                path: "lessonIds",
                model: Lesson
            }
        }).populate({
            path: "quizSet",
            model: Quizset,
            populate: {
                path: "quizIds",
                model: Quiz
            }
        }).lean();

        if (!course) return null;

        return replaceMongoIdInObject(course);
    } catch (err) {
        console.error("Error fetching course details:", err.message);
        return null;
    }
}

export async function getCourseDetailsByInstructor(instructorId, expand) {
    if (!instructorId) return null;
    await dbConnect();
    const publishedCourses = await Course.find({instructor: instructorId, active:true}).lean();

    const enrollments = await Promise.all(
        publishedCourses.map(async (course) => {
          const enrollment = await getEnrollmentsForCourse(course._id.toString());
          return enrollment;
        })
    );

    const allEnrollmentsFlat = enrollments.flat();
    const groupedByCourses = allEnrollmentsFlat.reduce((acc, item) => {
        const key = item.course ? item.course.toString() : "";
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    const totalRevenue = publishedCourses.reduce((acc, course) => {
        const courseIdStr = course._id.toString();
        const quantity = (groupedByCourses[courseIdStr] || groupedByCourses[course._id])?.length || 0;
        return (acc + quantity * (course.price || 0));
    }, 0);

    const totalEnrollments = allEnrollmentsFlat.length;

    const testimonials = await Promise.all(
        publishedCourses.map(async (course) => {
          const testimonial = await getTestimonialsForCourse(course._id.toString());
          return testimonial;
        })
    );

    const totalTestimonials = testimonials.flat();
    const avgRating = totalTestimonials.length > 0
        ? ((totalTestimonials.reduce((acc, obj) => acc + (obj.rating || 0), 0)) / totalTestimonials.length).toFixed(1)
        : "5.0";

    if (expand) {
        const allCourses = await Course.find({instructor: instructorId}).lean();
        return {
            "courses": replaceMongoIdInArray(allCourses?.flat() || []),
            "enrollments": replaceMongoIdInArray(allEnrollmentsFlat || []),
            "reviews": replaceMongoIdInArray(totalTestimonials || []),
        }
    }
    return {
        "courses": publishedCourses.length,
        "enrollments": totalEnrollments,
        "reviews": totalTestimonials.length,
        "ratings": avgRating,
        "revenue": totalRevenue
    }
}

export async function create(courseData) {
    try{
        await dbConnect();
        const course =  await Course.create(courseData);
        return JSON.parse(JSON.stringify(course));
    } catch(err) {
        throw new Error(err);
    }
}