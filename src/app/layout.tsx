import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Idam Adam - Lead Product Designer",
  description: "Portfolio of Idam Adam, Lead Product Designer with 8 years of experience creating intuitive web and mobile products through user-centered design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-8 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                Idam Adam
              </Link>
              <div className="flex space-x-6">
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Home
                </Link>
                <Link href="/performance-ai" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Performance AI
                </Link>
                <Link href="/multilingual" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Multilingual
                </Link>
                <Link href="/one-on-ones" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  1-on-1s
                </Link>
                <Link href="/home-connect" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Home Connect
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
