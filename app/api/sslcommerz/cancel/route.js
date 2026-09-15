import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const courseId = data.value_a;
    const requestUrl = new URL(request.url);
    const origin = process.env.NEXT_PUBLIC_APP_URL || requestUrl.origin;

    console.info("ℹ️ SSLCommerz Payment Cancelled by user:", {
      tran_id: data.tran_id,
      courseId,
    });

    const redirectUrl = courseId
      ? new URL(`/courses/${courseId}?payment=cancelled`, origin)
      : new URL(`/courses?payment=cancelled`, origin);

    return NextResponse.redirect(redirectUrl, 303);
  } catch (error) {
    console.error("SSLCommerz Cancel Route Error:", error);
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    return NextResponse.redirect(new URL("/courses?payment=cancelled", origin), 303);
  }
}
