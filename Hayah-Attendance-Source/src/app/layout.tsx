import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-arabic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Internal HD - لوحة التحكم",
  description: "نظام إدارة المهام والحضور الداخلي - استوديو HD",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable} dark`}>
      <body className="min-h-screen bg-[#0B0C0E] text-white antialiased font-[family-name:var(--font-arabic)]">
        {children}
      </body>
    </html>
  );
}
