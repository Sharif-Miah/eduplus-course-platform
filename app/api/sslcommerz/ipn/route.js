import { NextResponse } from "next/server";
import { validateSSLCommerzPayment } from "@/lib/sslcommerz";
import { enrollForCourse, hasEnrollmentForCourse } from "@/queries/enrollments";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const tran_id = data.tran_id;
    const val_id = data.val_id;
    const status = data.status;
    const courseId = data.value_a;
    const userId = data.value_b;

    console.log("🔔 SSLCommerz IPN Notification:", { tran_id, val_id, status, courseId, userId });

    if (!courseId || !userId || !val_id) {
      return NextResponse.json({ message: "Incomplete IPN data" }, { status: 400 });
    }

    if (status === "VALID" || status === "VALIDATED") {
      const validation = await validateSSLCommerzPayment(val_id);
      if (validation?.status === "VALID" || validation?.status === "VALIDATED") {
        const alreadyEnrolled = await hasEnrollmentForCourse(courseId, userId);
        if (!alreadyEnrolled) {
          await enrollForCourse(courseId, userId, "sslcommerz");
          console.log(`🎉 IPN: Enrolled user ${userId} for course ${courseId}`);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("SSLCommerz IPN Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
