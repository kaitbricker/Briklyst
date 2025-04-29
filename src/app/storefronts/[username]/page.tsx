"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Storefront {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  products: Product[];
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
  clicks: number;
}

export default function StorefrontPage({ params }: { params: { username: string } }) {
  const [storefront, setStorefront] = useState<Storefront | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStorefront = useCallback(async () => {
    try {
      const response = await fetch(`/api/storefronts?username=${params.username}`);
      const data = await response.json();
      setStorefront(data);
    } catch (error) {
      console.error("Failed to fetch storefront:", error);
      setError("Failed to fetch storefront");
    } finally {
      setLoading(false);
    }
  }, [params.username]);

  useEffect(() => {
    fetchStorefront();
  }, [fetchStorefront]);

  async function handleProductClick(productId: string) {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error || !storefront) {
    return (
      <div className="p-8 text-center text-red-600">
        {error || "Storefront not found"}
      </div>
    );
  }

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
                onClick={() => {
                  handleProductClick(product.id);
                  window.open(product.affiliateUrl, "_blank");
                }}
                style={{
                  backgroundColor: storefront.primaryColor,
                  color: storefront.accentColor,
                }}
              >
                View Product
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
