import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./model/user-model";
import { dbConnect } from "./service/mongo";
import bcrypt from "bcryptjs";

async function refreshAccessToken(token) {
    try {
        const url =
            "https://oauth2.googleapis.com/token?" +
            new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            });

            const response = await fetch(url, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              method: 'POST'
            })

            const refreshedTokens = await response.json();

            if(!response.ok) {
              throw refreshedTokens;
            }

            return {
              ...token,
              accessToken: refreshedTokens?.access_token,
              accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
              refreshToken: refreshedTokens?.refresh_token,
            }
    } catch (error) {
        console.log(error);

        return {
          ...token,
          error: "RefreshAccessTokenError"
        }
    }
}

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    ...authConfig,
    trustHost: true,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "84706212e8109edc5fea817ce23745adff4ab6e051c8a5dedd0721678ed5bca6",
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    await dbConnect();
                    const user = await User.findOne({
                        email: credentials?.email,
                    }).lean();

                    if (!user) {
                        return null;
                    }

                    let isMatch = false;
                    if (
                        user.password?.startsWith("$2a$") ||
                        user.password?.startsWith("$2b$") ||
                        user.password?.startsWith("$2y$")
                    ) {
                        isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                    } else {
                        isMatch = credentials.password === user.password;
                    }

                    if (isMatch) {
                        return {
                            id: user._id.toString(),
                            name: `${user.firstName || user.first_name || ''} ${user.lastName || user.last_name || ''}`.trim(),
                            email: user.email,
                            role: user.role,
                            image: user.profilePicture || user.profile_picture || null
                        };
                    }

                    return null;
                } catch (err) {
                    console.error("Authorize error:", err);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google" && user?.email) {
                try {
                    await dbConnect();
                    let existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        const names = (user.name || "").trim().split(" ");
                        const firstName = names[0] || "Student";
                        const lastName = names.slice(1).join(" ") || "";
                        existingUser = await User.create({
                            firstName,
                            lastName,
                            email: user.email,
                            role: "student",
                            profilePicture: user.image,
                        });
                    }
                    user.role = existingUser.role || "student";
                    user.id = existingUser._id.toString();
                    return true;
                } catch (err) {
                    console.error("Google sign-in error:", err);
                    return true;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
});

