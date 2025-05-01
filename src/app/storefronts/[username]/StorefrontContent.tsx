"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  affiliateUrl: string;
  clicks: number;
  tags?: string[];
  featured?: boolean;
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

interface StorefrontContentProps {
  username: string;
}

export function StorefrontContent({ username }: StorefrontContentProps) {
  const [storefront, setStorefront] = useState<Storefront | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStorefront() {
      try {
        const response = await fetch(`/api/storefronts?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch storefront');
        }
        const data = await response.json();
        setStorefront(data);
      } catch (err) {
        console.error('Error fetching storefront:', err);
        setError('Storefront not found');
      } finally {
        setLoading(false);
      }
    }

    fetchStorefront();
  }, [username]);

  const handleProductClick = async (productId: string) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

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

  const featuredProducts = storefront?.products.filter(p => p.featured) || [];
  const regularProducts = storefront?.products.filter(p => !p.featured) || [];
  const allTags = [...new Set(storefront?.products.flatMap(p => p.tags || []))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfbfb] to-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {storefront?.logoUrl && (
            <div className="relative mx-auto mb-6 h-24 w-24">
              <Image
                src={storefront.logoUrl}
                alt={storefront.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{storefront?.title}</h1>
          {storefront?.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {storefront.description}
            </p>
          )}
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search your favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === null
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6">Featured Picks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  primaryColor={storefront?.primaryColor || '#000'}
                  accentColor={storefront?.accentColor || '#fff'}
                  onClick={() => {
                    handleProductClick(product.id);
                    window.open(product.affiliateUrl, '_blank');
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Products */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">All Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                primaryColor={storefront?.primaryColor || '#000'}
                accentColor={storefront?.accentColor || '#fff'}
                onClick={() => {
                  handleProductClick(product.id);
                  window.open(product.affiliateUrl, '_blank');
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 