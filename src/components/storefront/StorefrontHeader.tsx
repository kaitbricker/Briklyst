'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Music2 } from 'lucide-react';

interface StorefrontHeaderProps {
  storefront: {
    title: string;
    logoUrl?: string | null;
    bannerUrl?: string | null;
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
  };
  user: {
    name: string | null;
    twitter?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    tiktok?: string | null;
    youtube?: string | null;
  };
  isOwner: boolean;
}

export default function StorefrontHeader({ storefront, user, isOwner }: StorefrontHeaderProps) {
  return (
    <header className="w-full relative">
      {/* Banner with gradient overlay (always present, fallback if missing) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-[280px] md:h-[400px] relative overflow-hidden"
      >
        <Image
          src={storefront.bannerUrl || '/placeholder-banner.jpg'}
          alt={`${user.name || 'Store'} banner`}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-banner.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      </motion.div>

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center -mt-16 md:-mt-24">
          {/* Logo/Avatar (centered) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm flex items-center justify-center"
          >
            <Image
              src={storefront.logoUrl || '/briklyst-logo.png'}
              alt={`${user.name || 'Store'} logo`}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/briklyst-logo.png';
              }}
            />
          </motion.div>

          {/* Store name, description, and socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-6 space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {storefront.title}
            </h1>
            <div className="flex justify-center gap-4 mt-2">
              {user.instagram && (
                <a href={user.instagram.startsWith('http') ? user.instagram : `https://instagram.com/${user.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-600 transition-colors" />
                </a>
              )}
              {user.tiktok && (
                <a href={user.tiktok.startsWith('http') ? user.tiktok : `https://tiktok.com/@${user.tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <Music2 className="w-6 h-6 text-black hover:text-gray-700 transition-colors" />
                </a>
              )}
              {user.youtube && (
                <a href={user.youtube.startsWith('http') ? user.youtube : `https://youtube.com/${user.youtube}`} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="w-6 h-6 text-red-500 hover:text-red-600 transition-colors" />
                </a>
              )}
            </div>
            {!isOwner && (
              <div className="space-y-3">
                <p className="text-gray-500 text-sm">@{user.name}</p>
                <button className="inline-flex items-center px-6 py-2.5 rounded-full bg-orange-500 text-white font-medium shadow-sm hover:bg-orange-600 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
} 