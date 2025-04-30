'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from products
  const allTags = Array.from(
    new Set(products.flatMap((product) => product.tags))
  ).sort();

  // Filter products based on selected tags
  const filteredProducts = selectedTags.length
    ? products.filter((product) =>
        selectedTags.some((tag) => product.tags.includes(tag))
      )
    : products;

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div>
      {allTags.length > 0 && (
        <ProductFilters
          tags={allTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            {product.imageUrl && (
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            
            {product.description && (
              <p className="text-gray-600 mb-4">{product.description}</p>
            )}

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              
              <div className="flex items-center gap-2">
                {product.clicks > 0 && (
                  <span className="text-sm text-gray-500">
                    {product.clicks} clicks
                  </span>
                )}
                
                <Link
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 