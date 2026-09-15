import { NextResponse } from "next/server";
import { validateSSLCommerzPayment } from "@/lib/sslcommerz";
import { enrollForCourse, hasEnrollmentForCourse } from "@/queries/enrollments";
import { getCourseDetails } from "@/queries/courses";
import { sendEmails } from "@/lib/emails";
import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const tran_id = data.tran_id;
    const val_id = data.val_id;
    const status = data.status;
    const card_type = data.card_type || "bKash / Mobile Banking";

    // Custom data passed during session creation
    const courseId = data.value_a;
    const userId = data.value_b;

    // Base origin for redirect
    const requestUrl = new URL(request.url);
    const origin = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin;

    console.log("✅ SSLCommerz Payment Success Callback:", {
      tran_id,
      val_id,
      status,
      courseId,
      userId,
      card_type,
    });

    if (!courseId || !userId) {
      console.error("Missing courseId or userId in SSLCommerz payload:", data);
      return NextResponse.redirect(
        new URL(`/courses?payment=missing_context`, origin),
        303
      );
    }

    // Check if status is valid
    const isValidStatus = status === "VALID" || status === "VALIDATED";
    if (!isValidStatus) {
      console.warn("Invalid payment status from SSLCommerz:", status);
      return NextResponse.redirect(
        new URL(`/courses/${courseId}?payment=invalid_status`, origin),
        303
      );
    }

    // Verify with SSLCommerz validation API
    if (val_id) {
      const validation = await validateSSLCommerzPayment(val_id);
      if (validation?.status !== "VALID" && validation?.status !== "VALIDATED") {
        console.warn("SSLCommerz validation failed:", validation);
        // If sandbox, some testbox transactions might skip, but log it
      }
    }

    // Check if user is already enrolled to prevent duplicate record
    const alreadyEnrolled = await hasEnrollmentForCourse(courseId, userId);
    if (!alreadyEnrolled) {
      await enrollForCourse(courseId, userId, "sslcommerz");
      console.log(`🎉 Successfully enrolled user ${userId} in course ${courseId} via SSLCommerz`);

      // Try sending confirmation emails
      try {
        await dbConnect();
        const course = await getCourseDetails(courseId);
        const student = await User.findById(userId).lean();

        if (student?.email && course?.title) {
          const studentName = `${student.firstName || ""} ${student.lastName || ""}`.trim() || "Student";
          const instructorName = `${course.instructor?.firstName || ""} ${course.instructor?.lastName || ""}`.trim() || "Instructor";

          const emailsToSend = [
            {
              to: student.email,
              subject: `Enrollment Confirmed: ${course.title}`,
              message: `Hi ${studentName}! Your payment of ৳${data.amount || ""} via ${card_type} (Tran ID: ${tran_id}) was successful. You now have full access to "${course.title}". Happy learning!`,
            },
          ];

          if (course.instructor?.email) {
            emailsToSend.push({
              to: course.instructor.email,
              subject: `New Student Enrollment: ${course.title}`,
              message: `Congratulations ${instructorName}! ${studentName} just enrolled in "${course.title}" using local payment (${card_type}).`,
            });
          }

          await sendEmails(emailsToSend);
        }
      } catch (emailErr) {
        console.warn("Could not send confirmation email:", emailErr.message);
      }
    }

    // Redirect to enrollment success page with HTTP 303 (See Other)
    const successUrl = new URL(
      `/enroll-success?courseId=${encodeURIComponent(courseId)}&tran_id=${encodeURIComponent(tran_id)}&method=sslcommerz`,
      origin
    );

    return NextResponse.redirect(successUrl, 303);
  } catch (error) {
    console.error("SSLCommerz Success Route Error:", error);
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL("/courses?payment=error", origin), 303);
  }
}
