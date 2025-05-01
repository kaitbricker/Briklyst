"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export interface HeroProduct {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  creatorNote?: string;
  testimonial?: string;
}

interface StorefrontHeroCarouselProps {
  products: HeroProduct[];
}

export default function StorefrontHeroCarousel({ products }: StorefrontHeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoPlaying || products.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, products.length]);

  const goTo = (idx: number) => {
    setCurrent((idx + products.length) % products.length);
    setIsAutoPlaying(false);
  };

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) goTo(current - 1);
    else if (delta < -50) goTo(current + 1);
    touchStartX.current = null;
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  if (!products.length) return null;

  return (
    <div
      className="relative w-full max-w-3xl mx-auto aspect-[16/7] rounded-2xl overflow-hidden bg-white/70 shadow-lg mb-10"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={products[current].id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 p-6 md:p-10 bg-gradient-to-br from-orange-50 via-white to-pink-50"
        >
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex-shrink-0 flex items-center justify-center">
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-md">
              <Image
                src={products[current].imageUrl || "/placeholder-product.jpg"}
                alt={products[current].title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{products[current].title}</h2>
            <span className="text-lg font-semibold text-orange-600">${products[current].price.toFixed(2)}</span>
            {products[current].creatorNote && (
              <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg text-sm font-medium max-w-md mx-auto md:mx-0">
                <span className="font-semibold">Why I love this:</span> {products[current].creatorNote}
              </div>
            )}
            {products[current].testimonial && (
              <div className="flex items-center gap-2 bg-pink-50 text-pink-700 px-4 py-2 rounded-lg text-sm max-w-md mx-auto md:mx-0">
                <Quote className="w-4 h-4 text-pink-400" />
                <span className="italic">{products[current].testimonial}</span>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Left/Right Arrows */}
      {products.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition z-20"
            onClick={() => goTo(current - 1)}
            aria-label="Previous"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition z-20"
            onClick={() => goTo(current + 1)}
            aria-label="Next"
          >
            <ArrowRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {products.map((_, idx) => (
          <button
            key={idx}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === current ? 'bg-orange-500 w-4' : 'bg-orange-200'}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 