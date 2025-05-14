"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DollarSign, Eye, ShoppingBag, Search as SearchIcon, Link2, Plus, Mail, Zap, BarChart2, MailOpen, Video, Share2, UserCheck, CheckCircle2, Bell, HelpCircle, X, ArrowUpRight, ArrowDownRight, Book } from 'lucide-react';
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
    shadowColor: 'rgba(93,157,255,0.3)'
  },
  {
    label: 'Top Product',
    value: 'Glow Serum',
    info: 'Most clicked',
    icon: <ShoppingBag className="h-7 w-7 text-white" />, 
    bg: 'from-[#B67AFF] via-[#9F63E8] to-[#8A4FDB]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(182,122,255,0.3)]',
    shadowColor: 'rgba(182,122,255,0.3)'
  },
  {
    label: 'Storefront Views',
    value: '12,345',
    info: '-5% from last week',
    icon: <Eye className="h-7 w-7 text-white" />, 
    bg: 'from-[#FFE066] via-[#FFD54F] to-[#FFC53D]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(255,224,102,0.3)]',
    shadowColor: 'rgba(255,224,102,0.3)'
  },
  {
    label: 'Revenue This Week',
    value: '$1,234',
    info: '+8% from last week',
    icon: <BarChart2 className="h-7 w-7 text-white" />,
    bg: 'from-[#4AE3B5] via-[#36D6A3] to-[#22C993]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(74,227,181,0.3)]',
    shadowColor: 'rgba(74,227,181,0.3)'
  },
  {
    label: 'Email Open Rate',
    value: '42%',
    info: 'vs. 38% last week',
    icon: <MailOpen className="h-7 w-7 text-white" />,
    bg: 'from-[#FF8EC4] via-[#FF79B3] to-[#F364A2]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(255,142,196,0.3)]',
    shadowColor: 'rgba(255,142,196,0.3)'
  },
  {
    label: 'Total Subscribers',
    value: '1,234',
    info: '+15% from last week',
    icon: <UserCheck className="h-7 w-7 text-white" />,
    bg: 'from-[#FFAC6B] via-[#FF9D59] to-[#FF9047]',
    shadow: 'shadow-[0_10px_25px_-5px_rgba(255,172,107,0.3)]',
    shadowColor: 'rgba(255,172,107,0.3)'
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
    <Card className="p-6 rounded-xl bg-white/85 backdrop-blur-md border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      
      <h2 className="text-xl font-bold mb-5 flex items-center gap-2 bg-gradient-to-r from-[#5D9DFF] to-[#4a8cff] bg-clip-text text-transparent relative z-10">
        <div className="p-2 rounded-lg bg-blue-50 text-[#5D9DFF]">
          <CheckCircle2 size={18}/>
        </div>
        To-Do List
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="relative z-10">
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center gap-3 p-3.5 mb-2.5 bg-white/80 rounded-lg hover:bg-white/95 hover:-translate-y-1 transition-all duration-150 cursor-move border border-gray-100/50"
                    >
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          todo.completed ? 'bg-[#5D9DFF] border-[#5D9DFF]' : 'border-gray-300'
                        }`}
                      >
                        {todo.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                      <span className={`flex-1 text-gray-700 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
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
    <Card className="p-6 rounded-xl bg-white/85 backdrop-blur-md border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      
      <h2 className="text-xl font-bold mb-5 flex items-center gap-2 bg-gradient-to-r from-[#B67AFF] to-[#9F63E8] bg-clip-text text-transparent relative z-10">
        <div className="p-2 rounded-lg bg-purple-50 text-[#B67AFF]">
          <Bell size={18}/>
        </div>
        Activity Feed
      </h2>
      <div className="space-y-4 relative z-10">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className={`p-4 rounded-lg transition-all duration-150 border ${
              notification.read ? 'bg-white/80 border-gray-100/50' : 'bg-[#5D9DFF]/5 border-[#5D9DFF]/10'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {notification.type === 'order' && <ShoppingBag className="h-4 w-4 text-[#5D9DFF]" />}
                  {notification.type === 'message' && <Mail className="h-4 w-4 text-[#B67AFF]" />}
                  {notification.type === 'system' && <Zap className="h-4 w-4 text-[#FFAC6B]" />}
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1.5 font-medium">{notification.time}</p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-[#5D9DFF] hover:text-[#3578E5] transition-colors p-1 rounded-full hover:bg-blue-50"
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
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-gradient-to-r from-[#5D9DFF] to-[#3578E5] text-white shadow-lg hover:shadow-xl hover:from-[#3578E5] hover:to-[#5D9DFF] transition-all duration-150 border border-white/10"
      >
        <HelpCircle className="w-6 h-6" />
      </Button>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="bg-white/95 backdrop-blur-md rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/30 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
              
              {/* Background accent */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-5 bg-gradient-to-r from-[#5D9DFF] to-[#3578E5] bg-clip-text text-transparent flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-50 text-[#5D9DFF]">
                    <HelpCircle size={20}/>
                  </div>
                  Need Help?
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-white/70 rounded-lg border border-gray-100/70 hover:bg-white/90 hover:-translate-y-1 transition-all duration-150">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Book className="h-4 w-4 text-[#5D9DFF]" /> Getting Started
                    </h3>
                    <p className="text-sm text-gray-600">Learn how to set up your storefront and start selling.</p>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg border border-gray-100/70 hover:bg-white/90 hover:-translate-y-1 transition-all duration-150">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-[#B67AFF]" /> Product Management
                    </h3>
                    <p className="text-sm text-gray-600">Tips for adding and managing your products effectively.</p>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg border border-gray-100/70 hover:bg-white/90 hover:-translate-y-1 transition-all duration-150">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-[#4AE3B5]" /> Analytics Guide
                    </h3>
                    <p className="text-sm text-gray-600">Understanding your storefront&apos;s performance metrics.</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowHelp(false)}
                  className="mt-6 w-full bg-gradient-to-r from-[#5D9DFF] to-[#3578E5] text-white hover:from-[#3578E5] hover:to-[#5D9DFF] shadow-md hover:shadow-lg transition-all duration-150 border border-white/10"
                >
                  Close
                </Button>
              </div>
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
  const [showHelp, setShowHelp] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-8">
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10 p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
          
          {/* Background accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-sm font-semibold text-gray-500 tracking-wide uppercase mb-1">Your Dashboard</h2>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome Back, {user.name}
            </h1>
          </div>
          <div className="flex items-center gap-3 relative z-10">
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
                className={`pl-10 pr-4 py-2.5 rounded-lg border bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 transition-all duration-150 w-64 ${focused ? 'border-[#5D9DFF] ring-2 ring-[#5D9DFF]/20' : 'border-gray-200'}`}
              />
              <SearchIcon className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-all duration-150 ${focused ? 'text-[#5D9DFF]' : 'text-gray-400'}`} />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                className="bg-gradient-to-r from-[#5D9DFF] to-[#B67AFF] text-white font-medium px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-[#3578E5] hover:to-[#8A4FDB] transition-all duration-150 border border-white/10"
                onClick={() => router.push('/storefronts/' + (session?.user?.name || ''))}
              >
                <Eye className="mr-2 h-4 w-4" /> View Storefront
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Rest of the dashboard content */}
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-10">
          {statCards.map(card => (
            <motion.div
              key={card.label}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={`rounded-xl p-6 flex flex-col justify-between text-white bg-gradient-to-br ${card.bg} transition-all duration-200 overflow-hidden relative border border-white/10`}
              style={{ 
                boxShadow: `0 10px 30px -5px ${card.shadowColor}, 0 3px 8px -3px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.12)`,
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Light gloss effect */}
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-br from-white/20 to-transparent rounded-full filter blur-3xl opacity-60 transform -translate-y-1/2 translate-x-1/4 pointer-events-none z-0"></div>
              
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-white/90 tracking-wide flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md">
                      {card.icon}
                    </div>
                    <span className="truncate">{card.label}</span>
                  </div>
                </div>
                <div className="mt-auto">
                  <div className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight truncate">
                    {card.value}
                  </div>
                  <div className="text-xs sm:text-sm opacity-80 font-medium flex items-center gap-1 truncate">
                    {card.info.includes('+') ? 
                      <span className="flex items-center text-emerald-100 font-semibold"><ArrowUpRight size={14} /> {card.info}</span> : 
                      card.info.includes('-') ? 
                      <span className="flex items-center text-white font-semibold px-1.5 py-0.5 bg-black/20 rounded-full"><ArrowDownRight size={14} /> {card.info}</span> : 
                      card.label === 'Total Subscribers' ?
                      <span className="flex items-center text-amber-100 font-semibold">{card.info}</span> :
                      <span className="text-white">{card.info}</span>
                    }
                  </div>
                </div>
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
            className="bg-white/85 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100/50 max-w-3xl w-full relative overflow-hidden"
          >
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
            
            {/* Background accent */}
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full filter blur-3xl"></div>
          
            <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-[#B67AFF] to-[#9F63E8] bg-clip-text text-transparent flex items-center gap-2 relative z-10">
              <div className="p-2 rounded-lg bg-purple-50 text-[#B67AFF]">
                <Zap className="h-5 w-5" />
              </div>
              Priority Tasks
            </h3>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-center justify-between p-3.5 bg-white/80 rounded-lg border border-gray-100/50 hover:bg-white/95 hover:-translate-y-1 transition-all duration-150">
                <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-[#FFAC6B]" /> Create a new product drop</span>
                <Button size="sm" variant="outline" className="rounded-lg border-gray-200 hover:border-[#FFAC6B] hover:text-[#FFAC6B] hover:bg-orange-50/50 transition-all" onClick={() => router.push('/dashboard/products')}>Create</Button>
              </li>
              <li className="flex items-center justify-between p-3.5 bg-white/80 rounded-lg border border-gray-100/50 hover:bg-white/95 hover:-translate-y-1 transition-all duration-150">
                <span className="flex items-center gap-2"><Video className="h-4 w-4 text-[#5D9DFF]" /> Add a hero video</span>
                <Button size="sm" variant="outline" className="rounded-lg border-gray-200 hover:border-[#5D9DFF] hover:text-[#5D9DFF] hover:bg-blue-50/50 transition-all" onClick={() => router.push('/dashboard/storefront')}>Add</Button>
              </li>
              <li className="flex items-center justify-between p-3.5 bg-white/80 rounded-lg border border-gray-100/50 hover:bg-white/95 hover:-translate-y-1 transition-all duration-150">
                <span className="flex items-center gap-2"><Share2 className="h-4 w-4 text-[#B67AFF]" /> Share on social media</span>
                <Button size="sm" variant="outline" className="rounded-lg border-gray-200 hover:border-[#B67AFF] hover:text-[#B67AFF] hover:bg-purple-50/50 transition-all" onClick={() => window.open('https://instagram.com', '_blank')}>Share</Button>
              </li>
              <li className="flex items-center justify-between p-3.5 bg-white/80 rounded-lg border border-gray-100/50 hover:bg-white/95 hover:-translate-y-1 transition-all duration-150">
                <span className="flex items-center gap-2"><UserCheck className="h-4 w-4 text-[#4AE3B5]" /> Complete your profile</span>
                <Button size="sm" variant="outline" className="rounded-lg border-gray-200 hover:border-[#4AE3B5] hover:text-[#4AE3B5] hover:bg-green-50/50 transition-all" onClick={() => router.push('/dashboard/settings')}>Complete</Button>
              </li>
              <li className="flex items-center justify-between p-3.5 bg-white/80 rounded-lg border border-gray-100/50 hover:bg-white/95 hover:-translate-y-1 transition-all duration-150">
                <span className="flex items-center gap-2"><MailOpen className="h-4 w-4 text-[#FF8EC4]" /> Send your first email</span>
                <Button size="sm" variant="outline" className="rounded-lg border-gray-200 hover:border-[#FF8EC4] hover:text-[#FF8EC4] hover:bg-pink-50/50 transition-all" onClick={() => router.push('/dashboard/email')}>Send</Button>
              </li>
            </ul>
          </motion.div>
          {/* Quick Links */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white/85 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-100/50 relative overflow-hidden">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
              
              {/* Background accent */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full filter blur-3xl"></div>
              
              <div className="font-bold text-lg mb-5 bg-gradient-to-r from-[#B67AFF] to-[#9F63E8] bg-clip-text text-transparent flex items-center gap-2 relative z-10">
                <div className="p-2 rounded-lg bg-purple-50 text-[#B67AFF]">
                  <Link2 className="h-5 w-5" />
                </div>
                Quick Links
              </div>
              <div className="flex flex-col gap-4 relative z-10">
                {quickLinks.map(link => (
                  <motion.button
                    key={link.label}
                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl font-medium ${link.gradient} text-white transition-all duration-200 relative overflow-hidden border border-white/10`}
                    onClick={() => handleQuickLink(link.action)}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    style={{ 
                      boxShadow: '0 8px 20px -6px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.12)',
                    }}
                  >
                    {/* Light gloss effect */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent rounded-full filter blur-3xl opacity-60 transform -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
                    
                    <span className="flex items-center gap-2.5 relative z-10">
                      <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
                        {link.icon}
                      </div>
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-80 relative z-10" />
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
          className="flex items-center gap-4 bg-white/85 backdrop-blur-md border-l-4 border-[#FFAC6B] p-5 rounded-xl shadow-lg mb-10 relative overflow-hidden"
        >
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
          
          {/* Background accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-orange-500/5 to-rose-500/5 rounded-full filter blur-3xl"></div>
          
          <div className="p-2 rounded-full bg-orange-50 text-[#FFAC6B] relative z-10">
            <Zap className="h-6 w-6" />
          </div>
          <div className="flex-1 relative z-10">
            <h4 className="font-semibold text-gray-900">Recommendation</h4>
            <p className="text-gray-600 text-sm">Try our new email templates to boost your engagement rates. Our AI can help you craft compelling messages.</p>
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-[#FFAC6B] via-[#FF9D59] to-[#FF9047] text-white font-medium px-4 py-2 rounded-lg hover:shadow-md transition-all duration-150 border border-white/10 whitespace-nowrap relative z-10"
          >
            Try now
          </Button>
        </motion.div>

        {/* Add help section */}
        <HelpSection />
      </main>
    </div>
  );
} 