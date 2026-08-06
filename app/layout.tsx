import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abetifi-stone-age.vercel.app";

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
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
