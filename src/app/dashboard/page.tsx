"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, Percent, Eye, Gift } from 'lucide-react';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Revenue This Week',
    value: '$1,250',
    icon: <DollarSign className="h-5 w-5 text-muted-foreground" />, 
    info: '+12% from last week',
  },
  {
    label: 'Top Product',
    value: 'Glow Serum',
    icon: <Gift className="h-5 w-5 text-muted-foreground" />, 
    info: 'Most clicked',
  },
  {
    label: 'Email Open Rate',
    value: '46%',
    icon: <Percent className="h-5 w-5 text-muted-foreground" />, 
    info: '+4% from last campaign',
  },
  {
    label: 'Storefront Views',
    value: '2,580',
    icon: <Eye className="h-5 w-5 text-muted-foreground" />, 
    info: '+8% from last week',
  },
];

const todos = [
  {
    label: "You haven't created a Drop this week",
    action: 'Create Drop',
    color: 'from-orange-400 to-pink-500',
  },
  {
    label: 'Add a video to your storefront',
    action: 'Add Video',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    label: 'Share on social media',
    action: 'Share',
    color: 'from-purple-500 to-indigo-500',
  },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = {
    name: session?.user?.name || 'Kaitlyn',
    avatar: session?.user?.image || '/avatar.png',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f1f5f9] p-4 md:p-8 space-y-8 transition-colors duration-300">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-between bg-white/80 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-lg gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Welcome back, {user.name}</h1>
          <p className="text-lg text-gray-500">Let&apos;s make your storefront shine.</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="w-20 h-20 rounded-full overflow-hidden border-4 border-gradient-to-r from-orange-400 to-pink-500 shadow-lg"
        >
          <Image src={user.avatar} alt="User avatar" width={80} height={80} />
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-orange-500 hover:to-pink-600 transition-all duration-200">
          View My Storefront
        </Button>
        <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-pink-600 hover:to-yellow-600 transition-all duration-200">
          + Add Product
        </Button>
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all duration-200">
          Send Email
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.info}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Suggestion Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm"
      >
        <span className="text-yellow-500 text-xl">★</span>
        <span className="font-medium">Suggestion:</span>
        <span>Try our new email templates.</span>
      </motion.div>

      {/* To-Do List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/90 rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-bold mb-4">To-Do</h2>
        <div className="space-y-4">
          {todos.map((todo) => (
            <motion.div
              key={todo.label}
              whileHover={{ scale: 1.03, backgroundColor: '#f9fafb' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between rounded-lg px-2 py-2 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-primary rounded transition-all duration-200" />
                <span className="font-medium text-gray-700">{todo.label}</span>
              </div>
              <Button className={`bg-gradient-to-r ${todo.color} text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200`}>
                {todo.action}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 