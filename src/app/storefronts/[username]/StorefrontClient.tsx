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
  images?: string[]; // Add support for multiple images
}

interface Storefront {
  id: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
  products: Product[];
}

interface StorefrontClientProps {
  storefront: Storefront;
}

export default function StorefrontClient({ storefront }: StorefrontClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Get all unique tags from products with null check
  const allTags = Array.from(new Set((storefront.products || []).flatMap(product => product.tags || [])));

  // Filter products based on search query and selected tags with null check
  const filteredProducts = (storefront.products || []).filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => (product.tags || []).includes(tag));
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
    <div className="min-h-screen" style={{ backgroundColor: storefront.theme.backgroundColor }}>
      {/* Hero Section with improved styling */}
      <div className="relative h-[500px] w-full overflow-hidden">
        {storefront.banner ? (
          <Image
            src={storefront.banner}
            alt={storefront.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div 
            className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          {storefront.logo && (
            <div className="mb-8 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <Image
                src={storefront.logo || '/briklyst-logo.png'}
                alt={storefront.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <h1 className="mb-4 text-5xl font-bold text-white font-inter">{storefront.name}</h1>
          <p className="max-w-2xl text-xl text-white/90 font-light">{storefront.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Search and Filter Section with improved styling */}
        <div className="mb-16 rounded-xl bg-white p-8 shadow-sm border border-gray-100">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg rounded-xl border-gray-200 focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  selectedTags.includes(tag)
                    ? `bg-gradient-to-r from-primary to-primary/80 text-white shadow-md`
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-sm"
                }`}
                style={{
                  backgroundColor: selectedTags.includes(tag) ? storefront.theme.primaryColor : undefined,
                  color: selectedTags.includes(tag) ? 'white' : undefined
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Product Section with improved styling */}
        {filteredProducts.length > 0 && (
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
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
                  <div className="p-10 md:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      {filteredProducts[0]?.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {filteredProducts[0].tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-4 py-1.5 text-sm font-medium rounded-full"
                              style={{
                                backgroundColor: `${storefront.theme.primaryColor}15`,
                                color: storefront.theme.primaryColor
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="font-bold text-4xl font-inter" style={{ color: storefront.theme.textColor }}>
                        {filteredProducts[0].title}
                      </h2>
                      <p className="text-lg text-gray-600 font-light" style={{ color: `${storefront.theme.textColor}99` }}>
                        {filteredProducts[0].description}
                      </p>
                      <div className="flex items-center justify-between pt-8">
                        <span className="text-3xl font-semibold" style={{ color: storefront.theme.textColor }}>
                          ${filteredProducts[0].price.toFixed(2)}
                        </span>
                        <Button
                          size="lg"
                          className="group/button flex items-center gap-3 rounded-full px-8 py-4 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                          style={{
                            backgroundColor: storefront.theme.accentColor,
                            color: storefront.theme.backgroundColor
                          }}
                          onClick={() => {
                            handleProductClick(filteredProducts[0].id, filteredProducts[0].affiliateUrl);
                            window.open(filteredProducts[0].affiliateUrl, "_blank");
                          }}
                        >
                          Shop Now
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Product Grid with improved styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.slice(1).map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Card className="group overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="relative aspect-square">
                  <Image
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.images && product.images[1] && hoveredProduct === product.id && (
                    <Image
                      src={product.images[1]}
                      alt={product.title}
                      fill
                      className="object-cover transition-opacity duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  {product?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm font-medium rounded-full"
                          style={{
                            backgroundColor: `${storefront.theme.primaryColor}15`,
                            color: storefront.theme.primaryColor
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="font-semibold text-xl mb-2 font-inter" style={{ color: storefront.theme.textColor }}>
                    {product.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-gray-600 font-light" style={{ color: `${storefront.theme.textColor}99` }}>
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold" style={{ color: storefront.theme.textColor }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      className="rounded-full px-5 py-2 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                      style={{
                        backgroundColor: storefront.theme.accentColor,
                        color: storefront.theme.backgroundColor
                      }}
                      onClick={() => {
                        handleProductClick(product.id, product.affiliateUrl);
                        window.open(product.affiliateUrl, "_blank");
                      }}
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 