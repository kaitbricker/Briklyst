"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DollarSign, Eye, ShoppingBag, Search as SearchIcon, Link2, Plus, Mail, Zap, BarChart2, MailOpen, Video, Share2, UserCheck, CheckCircle2, Bell, HelpCircle, X } from 'lucide-react';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const statCards = [
  {
    label: 'Product Clicks',
    value: '12,345',
    info: '+12% from last week',
    icon: <DollarSign className="h-7 w-7 text-white" />, 
    bg: 'from-[#5D9DFF] via-[#4a8cff] to-[#3578E5]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(93,157,255,0.3)]',
  },
  {
    label: 'Top Product',
    value: 'Glow Serum',
    info: 'Most clicked',
    icon: <ShoppingBag className="h-7 w-7 text-white" />, 
    bg: 'from-[#B67AFF] via-[#9F63E8] to-[#8A4FDB]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(182,122,255,0.3)]',
  },
  {
    label: 'Storefront Views',
    value: '12,345',
    info: '-5% from last week',
    icon: <Eye className="h-7 w-7 text-white" />, 
    bg: 'from-[#FFE066] via-[#FFD54F] to-[#FFC53D]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(255,224,102,0.3)]',
  },
  {
    label: 'Revenue This Week',
    value: '$1,234',
    info: '+8% from last week',
    icon: <BarChart2 className="h-7 w-7 text-white" />,
    bg: 'from-[#4AE3B5] via-[#36D6A3] to-[#22C993]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(74,227,181,0.3)]',
  },
  {
    label: 'Email Open Rate',
    value: '42%',
    info: 'vs. 38% last week',
    icon: <MailOpen className="h-7 w-7 text-white" />,
    bg: 'from-[#FF8EC4] via-[#FF79B3] to-[#F364A2]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(255,142,196,0.3)]',
  },
  {
    label: 'Total Subscribers',
    value: '1,234',
    info: '+15% from last week',
    icon: <UserCheck className="h-7 w-7 text-white" />,
    bg: 'from-[#FFAC6B] via-[#FF9D59] to-[#FF9047]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(255,172,107,0.3)]',
  },
];

const quickLinks = [
  {
    label: 'Copy Link to Storefront',
    icon: <Link2 className="h-5 w-5 text-white" />, 
    gradient: 'bg-gradient-to-r from-[#5D9DFF] via-[#738FFF] to-[#B67AFF]',
    action: 'copy',
  },
  {
    label: 'Add Product',
    icon: <Plus className="h-5 w-5 text-white" />, 
    gradient: 'bg-gradient-to-r from-[#4AE3B5] via-[#40B8E0] to-[#5D9DFF]',
    action: 'addProduct',
  },
  {
    label: 'Generate Email',
    icon: <Mail className="h-5 w-5 text-white" />, 
    gradient: 'bg-gradient-to-r from-[#FF8EC4] via-[#DE85DD] to-[#B67AFF]',
    action: 'generateEmail',
  },
  {
    label: 'Create a Drop',
    icon: <Zap className="h-5 w-5 text-white" />, 
    gradient: 'bg-gradient-to-r from-[#FFE066] via-[#FFBE7D] to-[#FFAC6B]',
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

// Add these new interfaces
interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Notification {
  id: string;
  type: 'order' | 'message' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Add these new components
const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Set up your storefront', completed: false },
    { id: '2', text: 'Add your first product', completed: false },
    { id: '3', text: 'Customize your theme', completed: false },
  ]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <Card className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#5D9DFF]">
        <CheckCircle2 size={20}/> To-Do List
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center gap-3 p-3 mb-2 bg-white/50 rounded-lg hover:bg-white/80 transition-all duration-200 cursor-move"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          todo.completed ? 'bg-[#5D9DFF] border-[#5D9DFF]' : 'border-gray-300'
                        }`}
                      >
                        {todo.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                        {todo.text}
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Card>
  );
};

const ActivityFeed = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'New Order',
      message: 'You received a new order for Glow Serum',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Customer inquiry about shipping times',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'system',
      title: 'System Update',
      message: 'New features available in your dashboard',
      time: '2 hours ago',
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <Card className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#5D9DFF]">
        <Bell size={20}/> Activity Feed
      </h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg transition-all duration-200 ${
              notification.read ? 'bg-white/50' : 'bg-[#5D9DFF]/10'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-[#5D9DFF] hover:text-[#3578E5] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

const HelpSection = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-[#5D9DFF] text-white shadow-lg hover:bg-[#3578E5] transition-all duration-200"
      >
        <HelpCircle className="w-6 h-6" />
      </Button>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-[#5D9DFF]">Need Help?</h2>
              <div className="space-y-4">
                <div className="p-4 bg-[#5D9DFF]/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Getting Started</h3>
                  <p className="text-sm text-gray-600">Learn how to set up your storefront and start selling.</p>
                </div>
                <div className="p-4 bg-[#5D9DFF]/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Product Management</h3>
                  <p className="text-sm text-gray-600">Tips for adding and managing your products effectively.</p>
                </div>
                <div className="p-4 bg-[#5D9DFF]/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Analytics Guide</h3>
                  <p className="text-sm text-gray-600">Understanding your storefront&apos;s performance metrics.</p>
                </div>
              </div>
              <Button
                onClick={() => setShowHelp(false)}
                className="mt-6 w-full bg-[#5D9DFF] text-white hover:bg-[#3578E5]"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

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
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f1f5f9] p-8">
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-lg font-semibold text-gray-500 tracking-wide" style={{ textShadow: '0 2px 8px rgba(93,157,255,0.15)' }}>Your Briklyst Dashboard</h2>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-1 tracking-tight leading-tight" style={{ textShadow: '0 4px 16px rgba(93,157,255,0.18)' }}>Welcome Back, {user.name}</h1>
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
                className={`pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all duration-200 w-64 ${focused ? 'ring-2 ring-orange-400' : ''}`}
              />
              <SearchIcon className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-all duration-200 ${focused ? 'text-[#5D9DFF] scale-110' : 'text-gray-400'}`} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="bg-gradient-to-r from-[#5D9DFF] to-[#B67AFF] text-white font-semibold px-6 py-3 rounded-lg shadow-none hover:from-[#3578E5] hover:to-[#8A4FDB] transition-all"
                onClick={() => router.push('/storefronts/' + (session?.user?.name || ''))}
              >
                View My Storefront
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
          {statCards.map(card => (
            <motion.div
              key={card.label}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-2xl p-6 flex flex-col justify-between text-white bg-gradient-to-br ${card.bg} ${card.shadow} shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative`}
              style={{ 
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-base font-semibold tracking-wide flex items-center gap-2 truncate">
                    {card.icon}
                    <span className="truncate">{card.label}</span>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight truncate">{card.value}</div>
                <div className="text-xs sm:text-sm opacity-80 font-medium truncate">{card.info}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add new sections after the stats grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <TodoList />
          <ActivityFeed />
        </div>

        {/* To-Do List / Reminders & Quick Links */}
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 max-w-3xl w-full"
          >
            <h3 className="text-xl font-bold mb-4 text-[#B67AFF] flex items-center gap-2" style={{ textShadow: '0 2px 8px rgba(182,122,255,0.18)' }}>
              <Zap className="h-5 w-5" /> To-Do List
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-[#F59E42]" /> Create a new product drop</span>
                <Button size="sm" variant="outline" onClick={() => router.push('/dashboard/products')}>Create</Button>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Video className="h-4 w-4 text-[#5D9DFF]" /> Add a hero video</span>
                <Button size="sm" variant="outline" onClick={() => router.push('/dashboard/storefront')}>Add</Button>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><Share2 className="h-4 w-4 text-[#B67AFF]" /> Share on social media</span>
                <Button size="sm" variant="outline" onClick={() => window.open('https://instagram.com', '_blank')}>Share</Button>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><UserCheck className="h-4 w-4 text-[#34D399]" /> Complete your profile</span>
                <Button size="sm" variant="outline" onClick={() => router.push('/dashboard/settings')}>Complete</Button>
              </li>
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2"><MailOpen className="h-4 w-4 text-[#F472B6]" /> Send your first email</span>
                <Button size="sm" variant="outline" onClick={() => router.push('/dashboard/email')}>Send</Button>
              </li>
            </ul>
          </motion.div>
          {/* Quick Links */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-none p-6 border border-0">
              <div className="font-bold text-lg mb-4 text-[#B67AFF] flex items-center gap-2">
                <Link2 className="h-5 w-5" /> Quick Links
              </div>
              <div className="flex flex-col gap-4">
                {quickLinks.map(link => (
                  <motion.button
                    key={link.label}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold ${link.gradient} text-white transition-all duration-300 relative overflow-hidden`}
                    onClick={() => handleQuickLink(link.action)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ 
                      boxShadow: '0 8px 20px -6px rgba(0,0,0,0.15)',
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                    <span className="flex items-center gap-2 relative z-10">{link.icon} {link.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-pink-50 border-l-4 border-orange-400 p-4 rounded-lg shadow mb-10"
        >
          <span className="text-orange-400 text-xl">★</span>
          <span className="font-medium text-gray-800">Suggestion:</span>
          <span className="text-gray-700">Try our new email templates.</span>
        </motion.div>

        {/* Add help section */}
        <HelpSection />
      </main>
    </div>
  );
} 