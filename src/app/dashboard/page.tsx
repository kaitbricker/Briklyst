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
    icon: <DollarSign className="h-7 w-7" />, 
    gradient: 'from-[#e0e7ef] to-[#b6c6e3]',
  },
  {
    label: 'Top Product',
    value: 'Glow Serum',
    info: 'Most clicked',
    icon: <ShoppingBag className="h-7 w-7" />, 
    gradient: 'from-[#e7e0ef] to-[#c6b6e3]',
  },
  {
    label: 'Storefront Views',
    value: '12,345',
    info: '-5% from last week',
    icon: <Eye className="h-7 w-7" />, 
    gradient: 'from-[#f7e9d7] to-[#e3cdb6]',
  },
];

const quickLinks = [
  {
    label: 'Copy Link to Storefront',
    icon: <Link2 className="h-5 w-5" />, 
    gradient: 'from-[#b6c6e3] to-[#e0e7ef]',
    action: 'copy',
  },
  {
    label: 'Add Product',
    icon: <Plus className="h-5 w-5" />, 
    gradient: 'from-[#e3b6b6] to-[#e7e0ef]',
    action: 'addProduct',
  },
  {
    label: 'Generate Email',
    icon: <Mail className="h-5 w-5" />, 
    gradient: 'from-[#b6e3c6] to-[#e0efe7]',
    action: 'generateEmail',
  },
  {
    label: 'Create a Drop',
    icon: <Zap className="h-5 w-5" />, 
    gradient: 'from-[#e3d6b6] to-[#efe7e0]',
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
  const [focused, setFocused] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-b from-[#f6f7fa] to-[#f0f2f5] flex flex-col md:flex-row">
      {/* Sidebar Placeholder (actual sidebar is likely a separate component) */}
      <div className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-screen"></div>
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-lg font-semibold text-gray-500 tracking-wide">Your Briklyst Dashboard</h2>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-1 tracking-tight leading-tight">Welcome Back, {user.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              className="relative"
              whileFocus={{ scale: 1.03 }}
            >
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={`pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 w-64 ${focused ? 'ring-2 ring-[#b6c6e3]' : ''}`}
              />
              <SearchIcon className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-all duration-200 ${focused ? 'text-[#b6c6e3] scale-110' : 'text-gray-400'}`} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="bg-gradient-to-r from-[#b6c6e3] to-[#e0e7ef] text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:from-[#a0b4d6] hover:to-[#d0d8e7] transition-all"
                onClick={() => router.push('/storefronts/' + (session?.user?.name || ''))}
              >
                View My Storefront
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {statCards.map(card => (
            <motion.div
              key={card.label}
              whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 #b6c6e3' }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-2xl shadow-lg p-8 flex flex-col justify-between bg-gradient-to-br ${card.gradient} border border-gray-200 transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold tracking-wide text-gray-800 flex items-center gap-2">
                  {card.icon}
                  {card.label}
                </div>
              </div>
              <div className="text-4xl font-extrabold mb-2 tracking-tight text-gray-900">{card.value}</div>
              <div className="text-sm text-gray-700 opacity-80 font-medium">{card.info}</div>
            </motion.div>
          ))}
        </div>

        {/* Suggestion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#fffbe6] to-[#f7f3e6] border-l-4 border-[#e3cdb6] p-4 rounded-lg shadow mb-10"
        >
          <span className="text-[#e3cdb6] text-xl">★</span>
          <span className="font-medium text-gray-800">Suggestion:</span>
          <span className="text-gray-700">Try our new email templates.</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Live Storefront Section */}
          <motion.div
            className="flex-1 bg-white rounded-2xl shadow-lg p-6 mb-8 lg:mb-0 border border-gray-200"
            whileHover={{ boxShadow: '0 8px 32px 0 #e0e7ef' }}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="font-semibold text-lg text-gray-900">Live Storefront</span>
              <span className="bg-[#b6c6e3] text-white text-xs px-2 py-1 rounded-full ml-2">Rec</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-xl overflow-hidden col-span-1">
                <Image src={mainImage} alt="Main" fill className="object-cover" />
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-lg font-semibold">Front Side<br />Living Room</div>
              </div>
              <div className="flex flex-col gap-2 col-span-1">
                {liveStorefrontImages.map((img, idx) => (
                  <motion.button
                    key={img}
                    className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${mainImage === img ? 'border-[#b6c6e3] scale-105' : 'border-transparent'}`}
                    onClick={() => setMainImage(img)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image src={img} alt={`Thumb ${idx + 1}`} width={120} height={80} className="object-cover w-full h-20" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
              <div className="font-bold text-lg mb-4 text-[#6b5ca5] flex items-center gap-2">
                <Link2 className="h-5 w-5" /> Quick Links
              </div>
              <div className="flex flex-col gap-4">
                {quickLinks.map(link => (
                  <motion.button
                    key={link.label}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold shadow-md bg-gradient-to-r ${link.gradient} text-gray-900 border border-gray-200 transition-all duration-200`}
                    onClick={() => handleQuickLink(link.action)}
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 #b6c6e3' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="flex items-center gap-2">{link.icon} {link.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 