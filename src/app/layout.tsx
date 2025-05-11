import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from 'next/font/google'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Providers } from './providers'
import { StorefrontUpdateProvider } from '@/context/StorefrontUpdateContext';

const geistSans = GeistSans;
const geistMono = GeistMono;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Briklyst",
  description: "Your digital storefront platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans`}>
        <StorefrontUpdateProvider>
          <Providers>
            <ScrollProgress />
            {children}
            <Toaster />
          </Providers>
        </StorefrontUpdateProvider>
      </body>
    </html>
  );
}
