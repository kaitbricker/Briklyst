'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlayCircle, User, Search as SearchIcon } from 'lucide-react';

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
  },
  {
    name: 'Brown Casual Bag',
    price: 68.56,
    image: '/brown-bag.jpg',
  },
  {
    name: 'Orange Casual Bag',
    price: 68.56,
    image: '/orange-bag.jpg',
  },
];

export default function StorefrontClient() {
  const [search, setSearch] = useState('');
  const [selectedCollection, setSelectedCollection] = useState(collections[0].name);

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
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Input
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-full px-5 py-2 border border-yellow-900/20 bg-white focus:ring-yellow-900/20 w-64"
          />
          <SearchIcon className="-ml-8 text-yellow-900/60" />
        </div>
      </div>
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-6 bg-[#f6f7f2]">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-gradient-to-tr from-yellow-600 via-pink-400 to-purple-500 flex items-center justify-center">
            <Image src="/avatar.png" alt="Profile" width={80} height={80} className="rounded-full" />
          </div>
          <div className="absolute bottom-0 right-0 flex gap-1">
            <PlayCircle className="h-7 w-7 text-black" />
            <PlayCircle className="h-7 w-7 text-black" />
            <PlayCircle className="h-7 w-7 text-black" />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold mb-1">This is text for a test</div>
          <div className="text-gray-700">descriptions heading</div>
        </div>
        <Button className="bg-yellow-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow hover:bg-yellow-800">SUBSCRIBE</Button>
      </div>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 px-8 py-8">
        {/* Collections Sidebar */}
        <div className="flex flex-col gap-4 w-full md:w-56">
          {collections.map((col) => (
            <Button
              key={col.name}
              className={`w-full py-3 rounded-full font-semibold text-base shadow-sm ${col.isNew ? 'bg-yellow-700 text-white' : 'bg-white text-gray-700 border border-yellow-900/10'}`}
              onClick={() => setSelectedCollection(col.name)}
            >
              {col.name}
            </Button>
          ))}
        </div>
        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.name} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center">
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
                <Image src={product.image} alt={product.name} width={300} height={300} className="object-cover w-full h-full" />
              </div>
              <div className="font-semibold text-lg mb-1">{product.name}</div>
              <div className="font-bold text-xl mb-2">$ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              <Button className="bg-yellow-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-yellow-800">See Details</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 