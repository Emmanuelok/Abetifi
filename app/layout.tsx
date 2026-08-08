import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abetifi-7ssg.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#10120f",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bosumpra Heritage and Museum Development",
    template: "%s | Abetifi Stone Age",
  },
  description:
    "Research, conservation and development information for Bosumpra Rockshelter and the proposed museum centre in Abetifi, Ghana.",
  alternates: {
    canonical: "/",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: [
      {
        url: "/abetifi-favicon-20260807.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        url: "/abetifi-favicon-32-20260807.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    shortcut: "/abetifi-favicon-20260807.ico",
    apple: {
      url: "/abetifi-apple-touch-icon-20260807.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
  openGraph: {
    url: siteUrl,
    title: "Bosumpra Heritage and Museum Development",
    description:
      "Research, conservation and development information for Bosumpra Rockshelter and the proposed museum centre in Abetifi, Ghana.",
    type: "website",
    images: [
      {
        url: "/media/abetifi-hero-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Interpretive view of the Kwahu Plateau landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bosumpra Heritage and Museum Development",
    description:
      "Research, conservation and development information for Bosumpra Rockshelter and the proposed museum centre in Abetifi, Ghana.",
    images: ["/media/abetifi-hero-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Abetifi Stone Age",
    url: siteUrl,
    description:
      "Research, conservation and development information for Bosumpra Rockshelter and the proposed museum centre in Abetifi, Ghana.",
    inLanguage: "en",
    about: {
      "@type": "Place",
      name: "Bosumpra rockshelter",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Abetifi",
        addressRegion: "Eastern Region",
        addressCountry: "GH",
      },
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
