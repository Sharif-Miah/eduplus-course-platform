import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { getUserByEmail } from "@/queries/users";

import { sendEmails } from "@/lib/emails";

import { enrollForCourse } from "@/queries/enrollments";

export const dynamic = "force-dynamic";

const Success = async ({ searchParams }) => {
    const { session_id, courseId, tran_id, method } = searchParams || {};

    if (!session_id && !tran_id) {
        throw new Error(
            "Please provide a valid session_id or tran_id."
        );
    }

    const userSession = await auth();

    if (!userSession?.user?.email) {
        redirect("/login");
    }

    const course = await getCourseDetails(courseId);
    const loggedInUser = await getUserByEmail(userSession?.user?.email);

    let paymentStatus = "pending";
    let isSslCommerz = method === "sslcommerz" || !!tran_id;

    if (isSslCommerz) {
        paymentStatus = "succeeded";
        // Ensure enrollment is present in DB for safety
        if (course?.id && loggedInUser?.id) {
            try {
                await enrollForCourse(course.id, loggedInUser.id, "sslcommerz");
            } catch (e) {
                // Ignore if already enrolled
            }
        }
    } else if (session_id) {
        const checkoutSession = await stripe.checkout.sessions.retrieve(
            session_id,
            {
                expand: ["line_items", "payment_intent"],
            }
        );

        const paymentIntent = checkoutSession?.payment_intent;
        paymentStatus = paymentIntent?.status;

        if (paymentStatus === "succeeded") {
            // Update DB(Enrollment collection)
            const enrolled = await enrollForCourse(
              course?.id,
              loggedInUser?.id,
              "stripe"
            );
        }
    }

    if (paymentStatus === "succeeded") {
        const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
        const customerEmail = loggedInUser?.email;
        const productName = course?.title;

        // Send Emails to the instructor and student
        const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
        const instructorEmail = course?.instructor?.email;

        const emailsToSend = [
          {
            to: instructorEmail,
            subject: `New Enrollment for ${productName}.`,
            message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
          },
          {
            to: customerEmail,
            subject: `Enrollment Success for ${productName}`,
            message: `Hey ${customerName} You have successfully enrolled for the course ${productName}`,
          }
        ];

        try {
            await sendEmails(emailsToSend);
        } catch (e) {
            console.warn("Email send failed:", e?.message);
        }
    }

    const customerName = `${loggedInUser?.firstName || ""} ${loggedInUser?.lastName || ""}`.trim() || "Student";
    const productName = course?.title || "Course";

    return (
        <div className="h-full w-full flex-1 flex flex-col items-center justify-center py-20">
            <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
                {paymentStatus === "succeeded" && (
                    <>
                        <CircleCheck className="w-32 h-32 bg-emerald-500 rounded-full p-0 text-white" />
                        <h1 className="text-xl md:text-2xl lg:text-3xl text-slate-900 dark:text-white">
                            Congratulations, <strong>{customerName}</strong>! Your Enrollment was Successful for <strong>{productName}</strong>
                        </h1>
                    </>
                )}
                <div className="flex items-center gap-3">
                    <Button asChild size="sm" className="bg-[#4A3AFF] hover:bg-[#3D2FE6] text-white">
                        <Link href="/courses">Browse Courses</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="dark:border-slate-700 dark:text-slate-200">
                        <Link href={`/courses/${courseId}/lesson`}>
                            Play Course
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Success;
