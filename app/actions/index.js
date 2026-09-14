"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function ceredntialLogin(formData) {
    try {
       const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false
        });
        return response || { success: true };
    } catch(error) {
        if (error instanceof AuthError) {
            return { error: "Invalid email or password." };
        }
        return { error: "Invalid email or password." };
    }
}

export async function doSocialLogin(formData) {
    const action = formData.get("action");
    await signIn(action, { redirectTo: "/courses"})
}

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}