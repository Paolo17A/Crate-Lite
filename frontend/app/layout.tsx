import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display } from "next/font/google";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crate — Book entertainers",
  description:
    "Find and book DJs, musicians, bands, and other entertainers for your next event.",
  icons: {
    icon: [{ url: "/crate-icon.png", type: "image/png" }],
    apple: [{ url: "/crate-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-parchment font-performer text-espresso">
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
