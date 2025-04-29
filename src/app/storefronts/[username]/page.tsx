import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
  clicks: number;
}

interface Storefront {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  products: Product[];
}

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

  const storefront = await res.json() as Storefront;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: storefront.primaryColor,
        color: storefront.accentColor,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          {storefront.logoUrl && (
            <div className="relative mx-auto mb-4 h-32 w-32">
              <Image
                src={storefront.logoUrl}
                alt={storefront.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold">{storefront.title}</h1>
          {storefront.description && (
            <p className="mt-2 text-gray-600">{storefront.description}</p>
          )}
        </div>

        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
            style={{ color: storefront.accentColor }}
          >
            ← Back to home
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {storefront.products.map((product) => (
            <Card
              key={product.id}
              className="p-4"
              style={{
                backgroundColor: storefront.accentColor,
                color: storefront.primaryColor,
              }}
            >
              {product.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-medium">{product.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{product.description}</p>
              <p className="mt-2 font-medium">${product.price}</p>
              <Button
                className="mt-4 w-full"
                asChild
                style={{
                  backgroundColor: storefront.primaryColor,
                  color: storefront.accentColor,
                }}
              >
                <Link 
                  href={product.affiliateUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Product
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
