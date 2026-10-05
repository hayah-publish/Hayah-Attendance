import type { Metadata } from "next";
import { Tajawal, Poppins } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hayah-Attendance - لوحة التحكم",
  description: "نظام إدارة المهام والحضور - Hayah-Attendance",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${poppins.variable} dark`}>
      <body className="min-h-screen bg-[#141414] text-[#F5F3EF] antialiased font-[family-name:var(--font-tajawal)]">
        {children}
      </body>
    </html>
  );
}
