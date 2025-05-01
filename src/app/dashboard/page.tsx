"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Plus, Mail, Sparkles, CheckCircle, Store, Flame, BarChart2, ShoppingCart, ListTodo } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const summaryStats = [
  {
    title: "Revenue This Week",
    value: "$1,250",
    icon: <ShoppingCart className="w-5 h-5 text-orange-500" />,
    details: ["Mon: $200", "Tue: $180", "Wed: $220", "Thu: $300", "Fri: $350"],
  },
  {
    title: "Top Product",
    value: "Glow Serum",
    icon: <Flame className="w-5 h-5 text-pink-500" />,
    details: ["Clicks: 320", "Conversion: 8%"],
  },
  {
    title: "Email Open Rate",
    value: "42%",
    icon: <Mail className="w-5 h-5 text-blue-500" />,
    details: ["Campaign: 1,200 sent", "Opened: 504"],
  },
  {
    title: "Storefront Views",
    value: "2,340",
    icon: <BarChart2 className="w-5 h-5 text-green-500" />,
    details: ["Mobile: 1,400", "Desktop: 940"],
  },
];

const whatsNew = [
  {
    message: "New: Schedule product drops with a countdown!",
    link: "/dashboard/drops",
  },
  {
    message: "Tip: Add a hero video to boost engagement.",
    link: "/dashboard/storefront",
  },
  {
    message: "Suggestion: Try our new email templates.",
    link: "/dashboard/email",
  },
];

const todos = [
  {
    message: "You haven't created a Drop this week",
    cta: "Create Drop",
    link: "/dashboard/drops",
  },
  {
    message: "Add a hero video to your storefront",
    cta: "Add Video",
    link: "/dashboard/storefront",
  },
  {
    message: "Connect your email list",
    cta: "Connect",
    link: "/dashboard/settings",
  },
];

export default function DashboardPage() {
  const [currentNews, setCurrentNews] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const creatorName = "Kaitlyn";

  // Marquee/rotating news
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % whatsNew.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-pink-50 px-2 py-8 md:py-12 font-sans">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 mb-10">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-orange-400 animate-bounce" />
          <span>Welcome back, {creatorName}</span>
        </h1>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Button asChild size="lg" className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg hover:from-orange-600 hover:to-pink-600 text-lg font-semibold rounded-xl">
            <Link href="/storefronts/kaitlynbricker">
              <Store className="w-5 h-5 mr-2" /> View My Storefront
            </Link>
          </Button>
          <div className="flex flex-1 gap-2 justify-between md:justify-start">
            <Button asChild variant="secondary" className="flex-1 md:flex-none bg-white shadow hover:shadow-lg rounded-xl border border-gray-200 hover:bg-orange-50">
              <Link href="/dashboard/products"><Plus className="w-4 h-4 mr-1" /> Add Product</Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1 md:flex-none bg-white shadow hover:shadow-lg rounded-xl border border-gray-200 hover:bg-blue-50">
              <Link href="/dashboard/email"><Mail className="w-4 h-4 mr-1" /> Send Email</Link>
            </Button>
            <Button asChild variant="secondary" className="flex-1 md:flex-none bg-white shadow hover:shadow-lg rounded-xl border border-gray-200 hover:bg-pink-50">
              <Link href="/dashboard/drops"><Sparkles className="w-4 h-4 mr-1" /> Create Drop</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaryStats.map((stat, i) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(255, 140, 80, 0.15)" }}
            onMouseEnter={() => setHoveredStat(i)}
            onMouseLeave={() => setHoveredStat(null)}
            className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-2 cursor-pointer border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              {stat.icon}
              <span className="font-semibold text-gray-700 text-sm">{stat.title}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <AnimatePresence>
              {hoveredStat === i && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-xs text-gray-500 mt-2 space-y-1"
                >
                  {stat.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* What's New Block */}
      <div className="max-w-4xl mx-auto w-full mb-10">
        <Card className="rounded-2xl bg-gradient-to-r from-orange-100 to-pink-100 shadow-md p-6 flex items-center gap-4 overflow-x-auto">
          <Sparkles className="w-6 h-6 text-orange-400 flex-shrink-0 animate-pulse" />
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNews}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-base md:text-lg font-medium text-gray-800"
              >
                <Link href={whatsNew[currentNews].link} className="hover:underline">
                  {whatsNew[currentNews].message}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      </div>

      {/* To-Do Block */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="rounded-2xl bg-white shadow-md p-6 flex flex-col gap-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <ListTodo className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-gray-700 text-base">To-Do</span>
          </div>
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li key={todo.message} className="flex items-center justify-between gap-2">
                <span className="text-gray-700 text-sm">{todo.message}</span>
                <Button asChild size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow hover:from-orange-600 hover:to-pink-600 rounded-lg">
                  <Link href={todo.link}>{todo.cta}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </Card>
        {/* Optionally add more cards here, e.g. for tips or quick stats */}
      </div>

      {/* Mobile Mode (optional mini view) */}
      {/*
      <div className="fixed bottom-0 left-0 w-full bg-white border-t rounded-t-2xl shadow-lg flex justify-around py-2 z-50 md:hidden">
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs">
          <Store className="w-5 h-5" />
          Storefront
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs">
          <Plus className="w-5 h-5" />
          Add
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs">
          <Mail className="w-5 h-5" />
          Email
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1 text-xs">
          <Sparkles className="w-5 h-5" />
          Drops
        </Button>
      </div>
      */}
    </div>
  );
} 