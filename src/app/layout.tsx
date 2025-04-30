import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from 'next/font/google'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Providers } from './providers'

const geistSans = GeistSans;
const geistMono = GeistMono;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Briklyst - Create Your Storefront",
  description: "Create and customize your own storefront to showcase your products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans`}>
        <Providers>
          <ScrollProgress />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
