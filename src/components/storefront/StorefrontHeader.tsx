'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Music2 } from 'lucide-react';

interface StorefrontHeaderProps {
  storefront: {
    title: string;
    logoUrl?: string | null;
    bannerUrl?: string | null;
    headerImageUrl?: string | null;
    tagline?: string | null;
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
          src={storefront.headerImageUrl || storefront.bannerUrl || '/placeholder-banner.jpg'}
          alt={`${user.name || 'Store'} header`}
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
            {storefront.tagline && (
              <p className="text-lg text-gray-600 mt-2">{storefront.tagline}</p>
            )}
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
              {user.twitter && (
                <a href={user.twitter.startsWith('http') ? user.twitter : `https://twitter.com/${user.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg className="w-6 h-6 text-blue-400 hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.32 0-.63-.02-.94-.06A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg>
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