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
        <nav className="border-b border-subtle">
          <div className="px-8 sm:px-20 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-primary hover:text-accent">
                  Idam Adam
                </Link>
                <div className="flex space-x-6">
                  <Link href="/" className="text-secondary hover:text-primary">
                    Work
                  </Link>
                  <Link href="/about" className="text-secondary hover:text-primary">
                    About
                  </Link>
                  <Link href="/contact" className="text-secondary hover:text-primary">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
