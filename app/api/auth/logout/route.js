import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await signOut({ redirect: false });
  } catch (e) {
    // Continue even if NextAuth signOut throws redirect error
  }

  const response = NextResponse.redirect(new URL("/", request.url));

  // Explicitly clear all potential auth cookies on all paths/domains
  const cookieNames = [
    "authjs.session-token",
    "__Secure-authjs.session-token",
    "authjs.csrf-token",
    "__Host-authjs.csrf-token",
    "authjs.callback-url",
    "__Secure-authjs.callback-url",
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
    "next-auth.csrf-token",
    "__Host-next-auth.csrf-token",
    "next-auth.callback-url",
  ];

  cookieNames.forEach((name) => {
    response.cookies.delete(name);
    response.cookies.set({
      name,
      value: "",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
  });

  return response;
}

export async function POST(request) {
  return GET(request);
}
