'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, Heart, Grid, User, Search as SearchIcon, X, Menu, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

interface StorefrontClientProps {
  storefront: any;
}

export default function StorefrontClient({ storefront }: StorefrontClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [focused, setFocused] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalProduct, setModalProduct] = useState<any>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Extract collections from products
  const tagSet = new Set(
    (storefront.products || []).flatMap((p: any) => (p.tags || []).filter((tag: any) => typeof tag === 'string').map((tag: any) => String(tag)))
  );
  const collections: string[] = ['All', ...Array.from(tagSet) as string[]];

  // Filter products by search and collection
  const filteredProducts = (storefront.products || []).filter((p: any) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCollection =
      selectedCollection === 'All' || (p.tags || []).includes(selectedCollection);
    return matchesSearch && matchesCollection;
  });

  const theme = storefront.theme || {};

  return (
    <div className={`min-h-screen flex flex-col`} style={{ background: theme.backgroundColor, color: theme.textColor, fontFamily: theme.fontFamily?.body }}>
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-4 shadow-sm" style={{ background: theme.backgroundColor, borderBottom: `1px solid ${theme.primaryColor}` }}>
        <div className="flex items-center gap-3">
          <Image src={storefront.logoUrl || '/briklyst-logo.png'} alt="Storefront Logo" width={40} height={40} className="rounded-full" />
          <span className="text-xl font-bold" style={{ color: theme.textColor, fontFamily: theme.fontFamily?.heading }}>{storefront.name || storefront.title}</span>
        </div>
        <nav className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors"><Home /></button>
          <button className="hover:text-primary transition-colors"><Heart /></button>
          <button className="hover:text-primary transition-colors"><Grid /></button>
          <button className="hover:text-primary transition-colors"><User /></button>
        </nav>
        <div className="flex items-center gap-3 relative">
          <Input
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="rounded-full px-5 py-2 border bg-white w-64 transition-all duration-200"
            style={{ borderColor: theme.primaryColor, color: theme.textColor }}
          />
          <SearchIcon className="-ml-8" style={{ color: theme.primaryColor }} />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-10" style={{ color: theme.primaryColor }}>
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 bg-[#18181B] border-r border-[#222227] py-8 px-4 gap-4 shadow-none sticky top-0 h-screen z-20 transition-all duration-300">
          <nav className="flex flex-col gap-3 mt-8">
            {collections.map((col: string) => (
              <button
                key={col}
                onClick={() => setSelectedCollection(col)}
                className={`w-full px-0 py-0 rounded-full font-semibold text-base transition-all h-12 flex items-center justify-center
                  ${selectedCollection === col ? 'bg-[#23232A] text-white shadow-lg' : 'bg-[#23232A]/70 text-[#F5F5F7] hover:bg-[#23232A]/90 hover:text-white'}
                `}
                style={{ letterSpacing: '0.03em', fontFamily: theme.fontFamily?.heading, border: 'none' }}
              >
                {col}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8 px-4 py-8 relative">
          {/* Subtle noise overlay */}
          <div className="pointer-events-none fixed inset-0 z-0" style={{ background: 'url(/noise.png)', opacity: 0.04, mixBlendMode: 'overlay' }} />
          {/* Profile Section */}
          <section className="flex flex-col items-center justify-center text-center gap-4 mb-10 z-10">
            <div className="relative w-28 h-28 rounded-full mx-auto shadow-xl" style={{ boxShadow: '0 6px 32px 0 rgba(0,0,0,0.25)' }}>
              <Image src={storefront.logoUrl || '/briklyst-logo.png'} alt="Profile" width={112} height={112} className="rounded-full object-cover" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide mb-1" style={{ fontFamily: theme.fontFamily?.heading, letterSpacing: '0.04em', color: theme.textColor }}>{storefront.name || storefront.title}</h1>
            {storefront.tagline && <div className="italic text-lg text-[#B0B0B8] mb-1" style={{ fontFamily: theme.fontFamily?.body }}>{storefront.tagline}</div>}
            {storefront.description && <div className="text-base text-[#E5E5E7] mb-2 max-w-xl mx-auto" style={{ fontFamily: theme.fontFamily?.body }}>{storefront.description}</div>}
            <div className="flex items-center justify-center gap-4 mt-2">
              {storefront.socials?.tiktok && <a href={storefront.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><img src="/icons/tiktok.svg" alt="TikTok" className="w-6 h-6" /></a>}
              {storefront.socials?.instagram && <a href={storefront.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6" /></a>}
              {storefront.socials?.spotify && <a href={storefront.socials.spotify} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><img src="/icons/spotify.svg" alt="Spotify" className="w-6 h-6" /></a>}
              {storefront.socials?.youtube && <a href={storefront.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><img src="/icons/youtube.svg" alt="YouTube" className="w-6 h-6" /></a>}
            </div>
            <Button
              className="px-8 py-3 rounded-full font-bold text-lg shadow transition-all duration-200 bg-gradient-to-r from-[#23232A] to-[#2D2D32] hover:from-[#2D2D32] hover:to-[#23232A] border-none mt-4"
              style={{ color: '#fff', letterSpacing: '0.04em' }}
              onClick={() => toast({ title: 'Subscribed!', description: 'You are now subscribed.' })}
            >
              Subscribe
            </Button>
          </section>
          {/* Product Grid */}
          <section className="z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map((product: any) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#23232A] rounded-2xl shadow-xl p-6 flex flex-col items-center relative group transition-all duration-200 overflow-hidden"
                  style={{ borderRadius: theme.cardRadius, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)' }}
                >
                  {/* Heart icon */}
                  <motion.button
                    whileTap={{ scale: 1.3 }}
                    className="absolute top-4 right-4 z-20 bg-black/40 rounded-full p-2 hover:bg-black/70 transition-colors"
                    onClick={() => toast({ title: 'Favorited!', description: `Added ${product.title} to favorites.` })}
                  >
                    <Heart className="w-6 h-6 text-white" />
                  </motion.button>
                  {/* Product Image with blend mode */}
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 relative" style={{ background: '#18181B' }}>
                    <Image src={product.imageUrl || '/placeholder-product.jpg'} alt={product.title} width={300} height={300} className="object-cover w-full h-full" style={{ mixBlendMode: 'lighten' }} />
                  </div>
                  <div className="font-semibold text-lg mb-1 text-white" style={{ fontFamily: theme.fontFamily?.heading }}>{product.title}</div>
                  <div className="font-bold text-xl mb-2 text-[#B0B0B8]" style={{ fontFamily: theme.fontFamily?.body }}>$ {product.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  <Button className="px-6 py-2 rounded-full font-semibold shadow transition-all duration-200 bg-gradient-to-r from-[#23232A] to-[#2D2D32] hover:from-[#2D2D32] hover:to-[#23232A] border-none mt-2" style={{ color: '#fff', letterSpacing: '0.03em' }} onClick={() => { setModalProduct(product); setShowProductModal(true); }}>See Details</Button>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
      {/* Product Modal */}
      <AnimatePresence>
        {showProductModal && modalProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowProductModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowProductModal(false)}>
                <X className="h-6 w-6" />
              </button>
              <Image src={modalProduct.imageUrl || '/placeholder-product.jpg'} alt={modalProduct.title} width={400} height={400} className="rounded-xl mb-4 w-full h-64 object-cover" />
              <div className="font-bold text-2xl mb-2" style={{ color: theme.textColor }}>{modalProduct.title}</div>
              <div className="text-lg mb-4" style={{ color: theme.textColor }}>{modalProduct.description}</div>
              <div className="font-bold text-xl mb-4" style={{ color: theme.textColor }}>$ {modalProduct.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <Button className="px-6 py-2 rounded-full font-semibold shadow transition-all duration-200 w-full" style={{ background: theme.primaryColor, color: theme.textColor }}>Buy Now</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowVideoModal(false)}>
                <X className="h-6 w-6" />
              </button>
              <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                <PlayCircle className="h-16 w-16" style={{ color: theme.primaryColor }} />
              </div>
              <div className="font-bold text-2xl mb-2" style={{ color: theme.textColor }}>Video Title</div>
              <div className="text-lg mb-4" style={{ color: theme.textColor }}>This is a placeholder for a video or more info about the creator/storefront.</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 