export const authConfig = {
    session: {
        strategy: 'jwt',
    },
    providers: [],
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "84706212e8109edc5fea817ce23745adff4ab6e051c8a5dedd0721678ed5bca6",
    trustHost: true,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
};