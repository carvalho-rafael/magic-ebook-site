import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

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
  title: "Magic Ebook - Venda seus ebooks",
  description:
    "Venda seus ebooks de forma simples e rápida. Receba pela sua venda na hora. Menor taxa do mercado.",
  keywords: [
    "vender meu ebook",
    "vender ebooks",
    "onde vender ebooks",
    "como vender ebooks",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_WEB_URL || "https://www.magicebook.com.br"
  ),
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-5B49WN8S" />
      <GoogleAnalytics gaId="AW-17110194873" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
