"use client";
import { StorefrontUpdateProvider } from '@/context/StorefrontUpdateContext';
import { Providers } from '@/app/providers';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Toaster } from '@/components/ui/toaster';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <StorefrontUpdateProvider>
      <Providers>
        <ScrollProgress />
        {children}
        <Toaster />
      </Providers>
    </StorefrontUpdateProvider>
  );
} 