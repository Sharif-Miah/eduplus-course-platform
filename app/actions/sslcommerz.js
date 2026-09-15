"use server";

import { headers } from "next/headers";
import { auth } from "@/auth";
import { getCourseDetails } from "@/queries/courses";
import { getUserByEmail } from "@/queries/users";
import { initSSLCommerzSession, convertUsdToBdt } from "@/lib/sslcommerz";

export async function createSSLCommerzSession(formData) {
  const session = await auth();
  if (!session?.user) {
    return { loginRequired: true };
  }

  const courseId = typeof formData === "string" ? formData : formData?.get("courseId");
  if (!courseId) {
    return { error: "Course ID is required." };
  }

  const course = await getCourseDetails(courseId);
  if (!course) {
    return { error: "Course not found." };
  }

  const user = await getUserByEmail(session.user.email);
  if (!user) {
    return { error: "User profile not found." };
  }

  // Derive origin
  const headerList = headers();
  const host =
    headerList.get("x-forwarded-host") ||
    headerList.get("host") ||
    "localhost:3000";
  const protocol =
    headerList.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    headerList.get("origin") ||
    `${protocol}://${host}`;

  const amountInBdt = convertUsdToBdt(course.price);
  const tran_id = `EDU_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const customerName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Student";
  const customerEmail = user.email;

  try {
    const sslSession = await initSSLCommerzSession({
      amount: amountInBdt,
      tran_id,
      courseId,
      userId: user.id || user._id?.toString(),
      courseTitle: course.title,
      customerName,
      customerEmail,
      origin,
    });

    if (sslSession?.status === "SUCCESS" && sslSession?.GatewayPageURL) {
      return { url: sslSession.GatewayPageURL };
    }

    return {
      error: sslSession?.failedreason || "Failed to initiate SSLCommerz sandbox session.",
    };
  } catch (error) {
    console.error("SSLCommerz Server Action Error:", error);
    return { error: error.message || "Failed to initialize SSLCommerz gateway." };
  }
}
