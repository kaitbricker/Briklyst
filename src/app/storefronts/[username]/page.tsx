"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  affiliateUrl: string;
}

interface Storefront {
  id: string;
  title: string;
  description: string;
  userId: string;
}

type Props = {
  params: { username: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function StorefrontPage({ params }: Props) {
  const [storefront, setStorefront] = useState<Storefront | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStorefront = useCallback(async () => {
    try {
      const response = await fetch(`/api/storefronts/${params.username}`);
      if (!response.ok) {
        throw new Error('Storefront not found');
      }
      const data = await response.json();
      setStorefront(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load storefront');
    }
  }, [params.username]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`/api/products?storefrontId=${storefront?.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [storefront?.id]);

  useEffect(() => {
    fetchStorefront();
  }, [fetchStorefront]);

  useEffect(() => {
    if (storefront) {
      fetchProducts();
    }
  }, [storefront, fetchProducts]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!storefront) {
    return <div className="flex items-center justify-center min-h-screen">Storefront not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{storefront.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{storefront.description}</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              {product.imageUrl && (
                <div className="relative h-48">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <p className="mt-2 text-lg font-bold">${product.price}</p>
                <Button asChild className="mt-4 w-full">
                  <Link href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                    Buy Now
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
