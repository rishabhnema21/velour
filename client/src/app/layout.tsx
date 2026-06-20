import type { Metadata } from "next";
import { Geist, Geist_Mono, Urbanist, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/components/notifications/ToastProvider";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import BookDrawer from "@/components/book/BookDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const serif = Instrument_Serif({
  variable: "--serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Velour",
  description: "Velour - Live inside your books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", inter.variable)}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} ${serif.variable} antialiased`}
        >
          <ReactQueryProvider>
            <ToastProvider>{children}</ToastProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
