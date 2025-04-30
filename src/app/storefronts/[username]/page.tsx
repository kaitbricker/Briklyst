'use client';

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
  clicks: number;
  tags: string[];
}

interface Storefront {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  products: Product[];
}

export const metadata: Metadata = {
  title: "Storefront",
  description: "View products in this storefront",
};

export default function StorefrontPage({ params }: { params: { username: string } }) {
  const [storefront, setStorefront] = useState<Storefront | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStorefront = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/storefronts?username=${params.username}`, {
          cache: "no-store"
        });

        if (!res.ok) {
          notFound();
        }

        const data = await res.json();
        setStorefront(data);
      } catch (error) {
        console.error("Error fetching storefront:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStorefront();
  }, [params.username]);

  if (loading || !storefront) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
      </div>
    );
  }

  // Get all unique tags from products
  const allTags = Array.from(new Set(storefront.products.flatMap(product => product.tags)));

  // Filter products based on search query and selected tags
  const filteredProducts = storefront.products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => product.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: storefront.backgroundColor,
        color: storefront.textColor,
      }}
    >
      {/* Hero Section */}
      <div className="relative">
        {storefront.bannerUrl && (
          <div className="relative h-[400px] w-full">
            <Image
              src={storefront.bannerUrl}
              alt={storefront.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}
        
        <div className="relative -mt-20 mb-16 text-center">
          {storefront.logoUrl && (
            <div className="relative mx-auto h-40 w-40 rounded-full border-4 border-white bg-white shadow-lg">
              <Image
                src={storefront.logoUrl}
                alt={storefront.title}
                fill
                className="rounded-full object-cover"
              />
            </div>
          )}
          <h1 className="mt-4 text-4xl font-bold">{storefront.title}</h1>
          {storefront.description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              {storefront.description}
            </p>
          )}
          <Button
            className="mt-6 rounded-full px-8 py-6 text-lg"
            style={{
              backgroundColor: storefront.primaryColor,
              color: storefront.accentColor,
            }}
          >
            Subscribe
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">My Favorites</h2>
          <p className="mt-2 text-gray-600">Discover my curated selection of products</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {product.imageUrl && (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-2 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-medium">${product.price}</span>
                  <Button
                    className="group/button flex items-center gap-2 rounded-full"
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
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found matching your criteria.</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                setSelectedTags([]);
              }}
              className="mt-4"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
