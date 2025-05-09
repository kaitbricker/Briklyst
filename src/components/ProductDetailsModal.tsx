import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Tag, Star, Flame, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imageUrls?: string[];
  affiliateUrl: string;
  clicks: number;
  tags?: string[];
  featured?: boolean;
}

interface ProductDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function ProductDetailsModal({ open, onOpenChange, product }: ProductDetailsModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  if (!product) return null;
  const images = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl || '/placeholder-product.jpg'];
  const hasBestSeller = product.tags?.some(tag => tag.toLowerCase().includes('best seller'));
  const hasTrending = product.tags?.some(tag => tag.toLowerCase().includes('trending'));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Gallery */}
          <div className="relative w-full md:w-1/2 aspect-[4/3] bg-gray-100">
            <Image
              src={images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover rounded-l-lg"
            />
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    className={`w-4 h-4 rounded-full border-2 ${selectedImage === idx ? 'border-orange-500' : 'border-white'} bg-white/80 hover:border-orange-400 transition-all`}
                    style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                    aria-label={`Show image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
            {/* Best Seller/Trending Tag */}
            {hasBestSeller && (
              <span className="absolute top-2 left-2 z-20 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Best Seller</span>
            )}
            {hasTrending && (
              <span className="absolute top-2 left-2 z-20 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Trending</span>
            )}
          </div>
          {/* Details */}
          <div className="flex-1 p-6 flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-2">{product.title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${tag.toLowerCase().includes('featured') ? 'bg-pink-100 text-pink-600' : tag.toLowerCase().includes('drop') ? 'bg-orange-100 text-orange-600' : 'bg-orange-50 text-orange-600'}`}
                >
                  {tag.toLowerCase().includes('featured') ? <Star className="w-3.5 h-3.5" /> : tag.toLowerCase().includes('drop') ? <Flame className="w-3.5 h-3.5" /> : <Tag className="w-3.5 h-3.5" />} {tag === 'Uncategorized' ? 'Other' : tag}
                </span>
              ))}
            </div>
            <div className="text-gray-600 text-base mb-2">{product.description}</div>
            <div className="flex items-center gap-4 mt-auto">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <Button
                size="lg"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-md hover:from-pink-600 hover:to-orange-500 hover:shadow-lg transition-all border-0"
                onClick={() => window.open(product.affiliateUrl, '_blank')}
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant={isWishlisted ? 'default' : 'secondary'}
                className={`rounded-full ${isWishlisted ? 'bg-orange-500 text-white' : 'bg-white/90 text-gray-900 hover:bg-white'}`}
                onClick={() => setIsWishlisted((prev) => !prev)}
                aria-label="Add to wishlist"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-white/90 text-gray-900 hover:bg-white"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            {/* Placeholder for reviews */}
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-1">Customer Reviews</div>
              <div className="text-gray-400 italic">No reviews yet.</div>
            </div>
          </div>
        </div>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500">
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
} 