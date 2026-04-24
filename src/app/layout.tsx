import type { Metadata } from "next";
import { Rubik, Lexend } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Sentinel | Persona Login",
  description: "Identify yourself to continue into the command center.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${lexend.variable} h-full antialiased`}
    >
      <body style={{ fontFamily: "var(--font-rubik), sans-serif" }} className="min-h-full flex flex-col bg-[#1f1633] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
