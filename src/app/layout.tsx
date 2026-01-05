import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { CSSGradientBackground } from "@/components/CSSGradientBackground";

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
  metadataBase: new URL("https://idamadam.com"),
  title: "Idam Adam - Lead Product Designer",
  description:
    "Portfolio of Idam Adam, Lead Product Designer with 8 years of experience creating intuitive web and mobile products through user-centered design.",
  authors: [{ name: "Idam Adam" }],
  openGraph: {
    title: "Idam Adam - Lead Product Designer",
    description:
      "Portfolio of Idam Adam, Lead Product Designer with 8 years of experience creating intuitive web and mobile products through user-centered design.",
    url: "https://idamadam.com",
    siteName: "Idam Adam",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Idam Adam - Lead Product Designer",
    description:
      "Portfolio of Idam Adam, Lead Product Designer with 8 years of experience creating intuitive web and mobile products through user-centered design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  viewportFit: "cover",
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
        <CSSGradientBackground />
          {children}
        <Analytics />
      </body>
    </html>
  );
}
