import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abetifi Stone Age | Deep History, Shared Future",
    template: "%s | Abetifi Stone Age",
  },
  description:
    "Explore Bosumpra's 12,000+ years of human activity and the community-led vision for conservation, learning, enterprise and a new museum centre in Abetifi, Ghana.",
  alternates: {
    canonical: "/",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    url: siteUrl,
    title: "Abetifi Stone Age — Deep History, Shared Future",
    description:
      "A living heritage destination on Ghana's Kwahu Plateau, connecting archaeology, conservation, community and investment.",
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
    title: "Abetifi Stone Age — Deep History, Shared Future",
    description:
      "An evidence-led public platform for Bosumpra, conservation, community value and responsible partnership.",
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
      "An evidence-led public platform about Bosumpra rockshelter and the proposed Abetifi heritage project.",
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
