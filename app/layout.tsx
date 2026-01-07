import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Toolbox - UTM Builder & More",
    template: "%s | Toolbox",
  },
  description:
    "Free UTM parameter generator for marketers. Easily create and manage UTM URLs for Google Analytics campaign tracking.",
  keywords: [
    "UTM",
    "UTM builder",
    "UTM generator",
    "Google Analytics",
    "campaign tracking",
    "marketing tools",
  ],
  authors: [{ name: "Toolbox" }],
  openGraph: {
    title: "Toolbox - UTM Builder & More",
    description:
      "Free UTM parameter generator for marketers. Easily create and manage UTM URLs.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolbox - UTM Builder & More",
    description:
      "Free UTM parameter generator for marketers. Easily create and manage UTM URLs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
