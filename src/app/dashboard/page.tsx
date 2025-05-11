"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DollarSign, Percent, Eye, Gift, User } from 'lucide-react';
import Image from 'next/image';
import { useSession } from "next-auth/react";

const stats = [
  {
    label: 'Revenue This Week',
    value: '$1,250',
    icon: <DollarSign className="w-5 h-5 text-purple-500" />,
  },
  {
    label: 'Top Product',
    value: 'Glow Serum',
    icon: <Gift className="w-5 h-5 text-pink-500" />,
  },
  {
    label: 'Email Open Rate',
    value: '46%',
    icon: <Percent className="w-5 h-5 text-yellow-500" />,
  },
  {
    label: 'Storefront Views',
    value: '2,580',
    icon: <Eye className="w-5 h-5 text-indigo-500" />,
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
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f1f5f9] p-8 space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}</h1>
          <p className="text-lg text-gray-500">Let's make your storefront shine.</p>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-gradient-to-r from-orange-400 to-pink-500">
          <Image src={user.avatar} alt="User avatar" width={64} height={64} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-orange-500 hover:to-pink-600">
          View My Storefront
        </Button>
        <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-pink-600 hover:to-yellow-600">
          + Add Product
        </Button>
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600">
          Send Email
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white/90">
            <div className="mb-2">{stat.icon}</div>
            <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Suggestion Banner */}
      <div className="flex items-center gap-2 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
        <span className="text-yellow-500 text-xl">★</span>
        <span className="font-medium">Suggestion:</span>
        <span>Try our new email templates.</span>
      </div>

      {/* To-Do List */}
      <div className="bg-white/90 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">To-Do</h2>
        <div className="space-y-4">
          {todos.map((todo) => (
            <div key={todo.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-primary rounded" />
                <span>{todo.label}</span>
              </div>
              <Button className={`bg-gradient-to-r ${todo.color} text-white font-semibold px-4 py-2 rounded-lg shadow-md`}>
                {todo.action}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 