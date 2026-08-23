import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { dbConnect } from "@/service/mongo";
import AuthProvider from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });

export const metadata = {
  title: "EduPlus - World's Best Learning Platform",
  description: "Explore || Learn || Build || Share",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, poppins.className, "bg-[#ffffff] dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors duration-200")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster richColors position="top-center" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
