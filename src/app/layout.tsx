import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ShaderProviderWrapper from "@/components/ShaderProviderWrapper";
import { GrainBackground } from "@/components/GrainBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Idam Adam - Lead Product Designer",
  description: "Portfolio of Idam Adam, Lead Product Designer with 8 years of experience creating intuitive web and mobile products through user-centered design.",
};

// Polyfill localStorage for SSR
if (typeof window === 'undefined') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  } as Storage;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ShaderProviderWrapper>
          <GrainBackground />
          {children}
        </ShaderProviderWrapper>
      </body>
    </html>
  );
}
