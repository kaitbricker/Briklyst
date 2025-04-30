import { Metadata } from "next";
import { notFound } from "next/navigation";
import StorefrontClient from "./StorefrontClient";

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

  return <StorefrontClient storefront={storefront} />;
}
