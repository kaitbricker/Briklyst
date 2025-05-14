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
        <aside className="hidden md:flex flex-col w-56 bg-white/80 border-r border-gray-100 py-8 px-4 gap-4 shadow-sm">
          <nav className="flex flex-col gap-2">
            {collections.map((col: string) => (
              <button
                key={col}
                onClick={() => setSelectedCollection(col)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-all
                  ${selectedCollection === col ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                style={selectedCollection === col ? { background: theme.primaryColor, color: theme.textColor } : {}}
              >
                <Grid className="h-5 w-5" />
                {col}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8 px-4 py-8">
          {/* Profile Section */}
          <section className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-200" style={{ borderColor: theme.primaryColor }}>
              <Image src={storefront.logoUrl || '/briklyst-logo.png'} alt="Profile" width={96} height={96} className="rounded-full" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1" style={{ color: theme.textColor, fontFamily: theme.fontFamily?.heading }}>{storefront.name || storefront.title}</h1>
              <div className="text-lg mb-2" style={{ color: theme.textColor }}>{storefront.tagline || ''}</div>
              <div className="text-gray-700" style={{ color: theme.textColor }}>{storefront.description || ''}</div>
              <div className="flex gap-3 mt-3">
                {storefront.socials?.instagram && <a href={storefront.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500">Instagram</a>}
                {storefront.socials?.twitter && <a href={storefront.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400">Twitter</a>}
                {storefront.socials?.tiktok && <a href={storefront.socials.tiktok} target="_blank" rel="noopener noreferrer" className="hover:underline text-black">TikTok</a>}
              </div>
            </div>
            <Button
              className="px-8 py-3 rounded-full font-bold text-lg shadow transition-all duration-200"
              style={{ background: theme.primaryColor, color: theme.textColor }}
              onClick={() => toast({ title: 'Subscribed!', description: 'You are now subscribed.' })}
            >
              SUBSCRIBE
            </Button>
          </section>
          {/* Product Grid */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map((product: any) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center relative group transition-all duration-200"
                  style={{ borderRadius: theme.cardRadius, boxShadow: theme.cardShadow }}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 relative">
                    <Image src={product.imageUrl || '/placeholder-product.jpg'} alt={product.title} width={300} height={300} className="object-cover w-full h-full" />
                    <AnimatePresence>
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full font-semibold shadow transition-all duration-200 opacity-0 group-hover:opacity-100"
                        style={{ background: theme.primaryColor, color: theme.textColor }}
                        onClick={() => { setModalProduct(product); setShowProductModal(true); }}
                      >
                        Quick View
                      </motion.button>
                    </AnimatePresence>
                  </div>
                  <div className="font-semibold text-lg mb-1" style={{ color: theme.textColor }}>{product.title}</div>
                  <div className="font-bold text-xl mb-2" style={{ color: theme.textColor }}>$ {product.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  <Button className="px-6 py-2 rounded-full font-semibold shadow transition-all duration-200" style={{ background: theme.primaryColor, color: theme.textColor }} onClick={() => { setModalProduct(product); setShowProductModal(true); }}>See Details</Button>
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