import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SiteEffects from "@/components/SiteEffects";
import { asset } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "Optivads — Performance Media Buying & Creator Marketing for Mobile Apps",
    template: "%s — Optivads",
  },
  description:
    "Optivads is a performance marketing agency for mobile apps. Programmatic media buying, on-device, in-app, CTV and OEM traffic, plus influencer marketing, creative studio and UGC.",
  icons: { icon: asset("/favicon.png"), apple: asset("/apple-touch-icon.png") },
  openGraph: {
    title: "Optivads — Performance Media Buying & Creator Marketing",
    description:
      "Growth that performs. Users that stay. Performance media buying and creator-led content for fintech, wellness and consumer apps.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
