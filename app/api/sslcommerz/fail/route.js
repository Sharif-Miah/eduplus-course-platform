import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const courseId = data.value_a;
    const requestUrl = new URL(request.url);
    const origin = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin;

    console.warn("⚠️ SSLCommerz Payment Failed:", {
      tran_id: data.tran_id,
      error: data.error,
      courseId,
    });

    const redirectUrl = courseId
      ? new URL(`/courses/${courseId}?payment=failed`, origin)
      : new URL(`/courses?payment=failed`, origin);

    return NextResponse.redirect(redirectUrl, 303);
  } catch (error) {
    console.error("SSLCommerz Fail Route Error:", error);
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL("/courses?payment=failed", origin), 303);
  }
}
