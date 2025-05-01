'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Share2 } from 'lucide-react';
import ProductFilters from './ProductFilters';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  affiliateUrl: string;
  clicks: number;
  tags: string[];
  collection?: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique collections from products
  const allCollections = Array.from(
    new Set(products.map((product) => product.collection || 'Uncategorized'))
  ).sort();

  // Filter products based on selected collections
  const filteredProducts = selectedTags.length
    ? products.filter((product) =>
        selectedTags.includes(product.collection || 'Uncategorized')
      )
    : products;

  const handleTagSelect = (tag: string) => {
    if (!tag) {
      setSelectedTags([]);
      return;
    }
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
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
      window.open(affiliateUrl, "_blank");
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {allCollections.length > 0 && (
        <div className="mb-12">
          <ProductFilters
            tags={allCollections}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
          />
        </div>
      )}

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
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-product.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Featured Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    {filteredProducts[0].collection && (
                      <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-orange-50 text-orange-600">
                        {filteredProducts[0].collection}
                      </span>
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
                        onClick={() => handleProductClick(filteredProducts[0].id, filteredProducts[0].affiliateUrl)}
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

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence>
          {filteredProducts.slice(1).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Product Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-product.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/95 text-gray-900 hover:bg-white shadow-sm hover:shadow-md backdrop-blur-sm"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-white/95 text-gray-900 hover:bg-white shadow-sm hover:shadow-md backdrop-blur-sm"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-4 space-y-3">
                  {/* Collection */}
                  {product.collection && (
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-orange-50 text-orange-600">
                      {product.collection}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="font-semibold text-base text-gray-900 line-clamp-1 tracking-tight">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <div className="space-y-1">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <span className="text-base font-semibold text-gray-900">
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
                      className="group/button flex items-center gap-1.5 rounded-full px-4 py-1.5 border-2 font-medium transition-all hover:bg-gray-900 hover:text-white hover:border-gray-900"
                      onClick={() => handleProductClick(product.id, product.affiliateUrl)}
                    >
                      Shop Now
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/button:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 