"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DollarSign, Eye, ShoppingBag, Search as SearchIcon, Link2, Plus, Mail, Zap } from 'lucide-react';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const statCards = [
  {
    label: 'Product Clicks',
    value: '12,345',
    info: '+12% from last week',
    icon: <DollarSign className="h-8 w-8 text-white" />, 
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    label: 'Top Product',
    value: 'Glow Serum',
    info: 'Most clicked',
    icon: <ShoppingBag className="h-8 w-8 text-white" />, 
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    label: 'Storefront Views',
    value: '12,345',
    info: '-5% from last week',
    icon: <Eye className="h-8 w-8 text-white" />, 
    gradient: 'from-yellow-400 to-yellow-500',
  },
];

const quickLinks = [
  {
    label: 'Copy Link to Storefront',
    icon: <Link2 className="h-4 w-4" />, 
    gradient: 'from-blue-400 to-purple-500',
    action: 'copy',
  },
  {
    label: 'Add Product',
    icon: <Plus className="h-4 w-4" />, 
    gradient: 'from-pink-500 to-orange-400',
    action: 'addProduct',
  },
  {
    label: 'Generate Email',
    icon: <Mail className="h-4 w-4" />, 
    gradient: 'from-purple-500 to-pink-500',
    action: 'generateEmail',
  },
  {
    label: 'Create a Drop',
    icon: <Zap className="h-4 w-4" />, 
    gradient: 'from-pink-500 to-purple-500',
    action: 'createDrop',
  },
];

const liveStorefrontImages = [
  '/living-room.jpg',
  '/living-room2.jpg',
  '/living-room3.jpg',
  '/living-room4.jpg',
  '/living-room5.jpg',
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = {
    name: session?.user?.name || 'Storefront Name',
    avatar: session?.user?.image || '/avatar.png',
  };
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [mainImage, setMainImage] = useState(liveStorefrontImages[0]);

  // Quick link actions
  const handleQuickLink = (action: string) => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(window.location.origin + '/storefronts/' + (session?.user?.name || ''));
        toast({ title: 'Copied!', description: 'Storefront link copied to clipboard.' });
        break;
      case 'addProduct':
        router.push('/dashboard/products');
        break;
      case 'generateEmail':
        router.push('/dashboard/email');
        break;
      case 'createDrop':
        toast({ title: 'Coming Soon', description: 'This feature is coming soon!' });
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col md:flex-row">
      {/* Sidebar Placeholder (actual sidebar is likely a separate component) */}
      <div className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-screen"></div>
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-500">Your Briklyst Dashboard</h2>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Welcome Back, {user.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button
              className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-orange-500 hover:to-pink-600"
              onClick={() => router.push('/storefronts/' + (session?.user?.name || ''))}
            >
              View My Storefront
            </Button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map(card => (
            <motion.div
              key={card.label}
              whileHover={{ scale: 1.03 }}
              className={`rounded-2xl shadow-lg p-8 text-white flex flex-col justify-between bg-gradient-to-br ${card.gradient}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold">{card.label}</div>
                {card.icon}
              </div>
              <div className="text-4xl font-bold mb-2">{card.value}</div>
              <div className="text-sm opacity-80">{card.info}</div>
            </motion.div>
          ))}
        </div>

        {/* Suggestion Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow mb-8 flex items-center gap-2">
          <span className="text-yellow-500 text-xl">★</span>
          <span className="font-medium">Suggestion:</span>
          <span>Try our new email templates.</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Live Storefront Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 mb-8 lg:mb-0">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-semibold text-lg text-gray-900">Live Storefront</span>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">Rec</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-xl overflow-hidden col-span-1">
                <Image src={mainImage} alt="Main" fill className="object-cover" />
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-lg font-semibold">Front Side<br />Living Room</div>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                {liveStorefrontImages.map((img, idx) => (
                  <button
                    key={img}
                    className={`rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setMainImage(img)}
                  >
                    <Image src={img} alt={`Thumb ${idx + 1}`} width={120} height={80} className="object-cover w-full h-20" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="font-bold text-lg mb-4 text-purple-700 flex items-center gap-2">
                <Link2 className="h-5 w-5" /> Quick Links
              </div>
              <div className="flex flex-col gap-4">
                {quickLinks.map(link => (
                  <Button
                    key={link.label}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold shadow-md bg-gradient-to-r ${link.gradient}`}
                    onClick={() => handleQuickLink(link.action)}
                  >
                    <span className="flex items-center gap-2">{link.icon} {link.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 