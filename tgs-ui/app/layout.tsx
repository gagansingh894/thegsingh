import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const SITE_URL = "https://thegsingh.com";
const DESCRIPTION =
  "Senior Software Engineer specialising in distributed systems, ML infrastructure, and delivery platforms.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "G Singh — Senior Software Engineer",
    template: "%s — G Singh",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "G Singh",
    title: "G Singh — Senior Software Engineer",
    description: DESCRIPTION,
    images: [{ url: "/profile.png", width: 512, height: 512, alt: "Gagandeep Singh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "G Singh — Senior Software Engineer",
    description: DESCRIPTION,
    images: ["/profile.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${ibmPlexMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
