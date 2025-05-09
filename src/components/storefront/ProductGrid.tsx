'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import ProductFilters from './ProductFilters';
import { ProductDetailsModal } from '@/components/ProductDetailsModal';

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
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [openCollections, setOpenCollections] = useState<{ [key: string]: boolean }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // Group products by collection
  const collectionsMap: Record<string, Product[]> = {};
  products.forEach((product) => {
    const collection = product.collection || 'Uncategorized';
    if (!collectionsMap[collection]) collectionsMap[collection] = [];
    collectionsMap[collection].push(product);
  });
  const allCollections = ['All', ...Object.keys(collectionsMap).sort()];

  // Filter products by selected collection
  const displayedCollections = selectedCollection === 'All' ? Object.keys(collectionsMap) : [selectedCollection];

  const handleCollectionToggle = (collection: string) => {
    setOpenCollections((prev) => ({ ...prev, [collection]: !prev[collection] }));
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
      {/* Product Details Modal */}
      <ProductDetailsModal open={modalOpen} onOpenChange={setModalOpen} product={modalProduct} />
      {/* Collection Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {allCollections.map((col) => (
          <Button
            key={col}
            variant={selectedCollection === col ? 'default' : 'outline'}
            onClick={() => setSelectedCollection(col)}
            className="capitalize"
          >
            {col}
          </Button>
        ))}
      </div>

      {/* Render each collection as a collapsible section */}
      {displayedCollections.map((collection) => (
        <div key={collection} className="mb-10">
          <div className="flex items-center justify-between cursor-pointer select-none mb-4" onClick={() => handleCollectionToggle(collection)}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{collection}</h2>
            <Button size="icon" variant="ghost">
              {openCollections[collection] !== false ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
          <AnimatePresence initial={false}>
            {openCollections[collection] !== false && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {collectionsMap[collection].map((product) => (
                    <Card key={product.id} className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer" onClick={() => { setModalProduct(product); setModalOpen(true); }}>
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
                          <Button size="icon" variant="secondary" className="rounded-full bg-white/95 text-gray-900 hover:bg-white shadow-sm hover:shadow-md backdrop-blur-sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="secondary" className="rounded-full bg-white/95 text-gray-900 hover:bg-white shadow-sm hover:shadow-md backdrop-blur-sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {/* Product Content */}
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-base text-gray-900 line-clamp-1 tracking-tight">{product.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                          <Button size="sm" className="rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300" onClick={() => handleProductClick(product.id, product.affiliateUrl)}>
                            Shop
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
} 