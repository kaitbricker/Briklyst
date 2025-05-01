'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, X, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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

  const handleProductClick = async (productId: string, affiliateUrl: string) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error("Failed to track click:", error);
    }
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
                src={storefront.logoUrl || '/briklyst-logo.png'}
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

        {/* Featured Product Section */}
        {filteredProducts.length > 0 && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="group overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Featured Image */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={filteredProducts[0].imageUrl || '/placeholder-product.jpg'}
                      alt={filteredProducts[0].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Featured Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      {filteredProducts[0].tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {filteredProducts[0].tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-4 py-1.5 text-sm font-medium rounded-full bg-orange-50 text-orange-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="font-bold text-3xl text-gray-900">
                        {filteredProducts[0].title}
                      </h2>
                      <p className="text-gray-600 text-lg">
                        {filteredProducts[0].description}
                      </p>
                      <div className="flex items-center justify-between pt-6">
                        <span className="text-2xl font-semibold text-gray-900">
                          ${filteredProducts[0].price.toFixed(2)}
                        </span>
                        <Button
                          size="lg"
                          className="group/button flex items-center gap-3 rounded-full px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300"
                          onClick={() => {
                            handleProductClick(filteredProducts[0].id, filteredProducts[0].affiliateUrl);
                            window.open(filteredProducts[0].affiliateUrl, "_blank");
                          }}
                        >
                          Shop Now
                          <ArrowRight className="w-5 h-5 transition-transform group-hover/button:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.slice(1).map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/95 text-gray-900 hover:bg-white shadow-md hover:shadow-lg"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/95 text-gray-900 hover:bg-white shadow-md hover:shadow-lg"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6 space-y-4">
                  {/* Tags */}
                  {product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-bold text-xl text-gray-900 line-clamp-1 tracking-tight">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    {product.description.length > 100 && (
                      <button className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors">
                        Read more →
                      </button>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="space-y-1">
                      <span className="text-lg font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.clicks > 0 && (
                        <p className="text-xs text-gray-500 tracking-wide">
                          {product.clicks} clicks
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/button flex items-center gap-2 rounded-full px-5 py-2 border-2 font-medium transition-all hover:bg-gray-900 hover:text-white hover:border-gray-900"
                      onClick={() => {
                        handleProductClick(product.id, product.affiliateUrl);
                        window.open(product.affiliateUrl, "_blank");
                      }}
                    >
                      Shop Now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
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