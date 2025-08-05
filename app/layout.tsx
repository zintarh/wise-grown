import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/600.css";
import "@fontsource/urbanist/700.css";
import "@fontsource/urbanist/800.css";
import "@fontsource/urbanist/900.css";


import Navigation from "./components/Navigation";
import BackgroundMusic from "./components/BackgroundMusic";
import SankofaFooter from "./components/SankofaFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wisegrown - Your Digital Sanctuary for Ancestral Wisdom",
  description: "Reconnect with your heritage through ancestral knowledge, mindful nutrition, and holistic living practices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <BackgroundMusic />
        {children}
      </body>
    </html>
  );
}
