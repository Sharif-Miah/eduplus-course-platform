"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ session, children }) {
  return (
    <SessionProvider basePath="/api/auth" session={session}>
      {children}
    </SessionProvider>
  );
}
