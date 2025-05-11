'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlayCircle, User, Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const collections = [
  { name: 'New Collection', isNew: true },
  { name: 'Collection' },
  { name: 'Collection' },
  { name: 'Collection' },
];

const products = [
  {
    name: 'Beige Casual Bag',
    price: 68.56,
    image: '/beige-bag.jpg',
    description: 'A stylish beige bag for everyday use.',
  },
  {
    name: 'Brown Casual Bag',
    price: 68.56,
    image: '/brown-bag.jpg',
    description: 'A classic brown bag for all occasions.',
  },
  {
    name: 'Orange Casual Bag',
    price: 68.56,
    image: '/orange-bag.jpg',
    description: 'A vibrant orange bag to make a statement.',
  },
];

export default function StorefrontClient() {
  const [search, setSearch] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(collections[0].name);
  const [focused, setFocused] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Filter products by search and collection
  const filteredProducts = products.filter(
    (p) =>
      (selectedCollection === 'New Collection' || selectedCollection === 'Collection') &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f6f7f2] px-0 md:px-0">
      {/* Banner */}
      <div className="w-full h-48 md:h-64 relative">
        <Image src="/banner.jpg" alt="Banner" fill className="object-cover" />
      </div>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-b border-yellow-900/30 bg-[#f6f7f2]">
        <div className="flex items-center gap-3">
          <User className="h-7 w-7 text-yellow-900" />
          <span className="text-xl font-bold">Storefront Name</span>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0 relative">
          <Input
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`rounded-full px-5 py-2 border border-yellow-900/20 bg-white focus:ring-yellow-900/20 w-64 transition-all duration-200 ${focused ? 'ring-2 ring-yellow-700' : ''}`}
          />
          <SearchIcon className={`-ml-8 transition-all duration-200 ${focused ? 'text-yellow-700 scale-110' : 'text-yellow-900/60'}`} />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-10 text-yellow-900/60 hover:text-yellow-900">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-6 bg-[#f6f7f2]">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05, boxShadow: '0 0 0 4px #fbbf24' }}
        >
          <div className="w-24 h-24 rounded-full border-4 border-gradient-to-tr from-yellow-600 via-pink-400 to-purple-500 flex items-center justify-center transition-all duration-200">
            <Image src="/avatar.png" alt="Profile" width={80} height={80} className="rounded-full" />
          </div>
          <div className="absolute bottom-0 right-0 flex gap-1">
            {[1,2,3].map((i) => (
              <button key={i} onClick={() => setShowVideoModal(true)}>
                <PlayCircle className="h-7 w-7 text-black hover:text-yellow-700 transition" />
              </button>
            ))}
          </div>
        </motion.div>
        <div className="flex-1">
          <div className="text-lg font-semibold mb-1">This is text for a test</div>
          <div className="text-gray-700">descriptions heading</div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="bg-yellow-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow hover:bg-yellow-800 transition-all duration-200"
            onClick={() => toast({ title: 'Subscribed!', description: 'You are now subscribed.' })}
          >
            SUBSCRIBE
          </Button>
        </motion.div>
      </div>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 px-8 py-8">
        {/* Collections Sidebar */}
        <div className="flex flex-col gap-4 w-full md:w-56">
          {collections.map((col) => (
            <motion.button
              key={col.name}
              onClick={() => setSelectedCollection(col.name)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 rounded-full font-semibold text-base shadow-sm transition-all duration-200
                ${selectedCollection === col.name ? 'bg-yellow-700 text-white scale-105' : col.isNew ? 'bg-yellow-700 text-white' : 'bg-white text-gray-700 border border-yellow-900/10'}`}
            >
              {col.name}
            </motion.button>
          ))}
        </div>
        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.name}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 #fbbf24' }}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center relative group transition-all duration-200"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 relative">
                <Image src={product.image} alt={product.name} width={300} height={300} className="object-cover w-full h-full" />
                <AnimatePresence>
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-yellow-700 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-yellow-800 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    onClick={() => { setModalProduct(product); setShowProductModal(true); }}
                  >
                    Quick View
                  </motion.button>
                </AnimatePresence>
              </div>
              <div className="font-semibold text-lg mb-1">{product.name}</div>
              <div className="font-bold text-xl mb-2">$ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <Button className="bg-yellow-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-yellow-800 transition-all duration-200" onClick={() => { setModalProduct(product); setShowProductModal(true); }}>See Details</Button>
            </motion.div>
          ))}
        </div>
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
              <Image src={modalProduct.image} alt={modalProduct.name} width={400} height={400} className="rounded-xl mb-4 w-full h-64 object-cover" />
              <div className="font-bold text-2xl mb-2">{modalProduct.name}</div>
              <div className="text-lg text-gray-700 mb-4">{modalProduct.description}</div>
              <div className="font-bold text-xl mb-4">$ {modalProduct.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <Button className="bg-yellow-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-yellow-800 w-full">Buy Now</Button>
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
                <PlayCircle className="h-16 w-16 text-yellow-700" />
              </div>
              <div className="font-bold text-2xl mb-2">Video Title</div>
              <div className="text-lg text-gray-700 mb-4">This is a placeholder for a video or more info about the creator/storefront.</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 