'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X, Heart, Share2 } from "lucide-react";
import { useState } from "react";

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
  products: Product[];
}

interface StorefrontClientProps {
  storefront: Storefront;
}

export default function StorefrontClient({ storefront }: StorefrontClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        {storefront.bannerUrl ? (
          <Image
            src={storefront.bannerUrl}
            alt={storefront.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div 
            className="h-full w-full"
            style={{ backgroundColor: storefront.primaryColor }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          {storefront.logoUrl && (
            <div className="mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-white">
              <Image
                src={storefront.logoUrl}
                alt={storefront.title}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <h1 className="mb-4 text-4xl font-bold text-white">{storefront.title}</h1>
          <p className="max-w-2xl text-lg text-white/90">{storefront.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-12 rounded-lg bg-white p-6 shadow-sm">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
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
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {product.imageUrl && (
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute right-4 top-4 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/90 text-gray-900 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/90 text-gray-900 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              <div className="p-6">
                <div className="mb-2 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
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
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
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