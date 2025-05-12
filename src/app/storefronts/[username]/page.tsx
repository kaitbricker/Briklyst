import { Metadata } from "next";
import { notFound } from "next/navigation";
import StorefrontClient from "./StorefrontClient";
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: "Storefront",
  description: "View products in this storefront",
};

export default async function StorefrontPage({ params }: { params: { username: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/storefronts?username=${params.username}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    notFound();
  }

  const storefront = await res.json();

  return (
    <ThemeProvider themeId={storefront.theme?.id || 'bubblegum-pop'}>
      <StorefrontClient storefront={storefront} />
    </ThemeProvider>
  );
}
