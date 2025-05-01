"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DateRangePicker } from "@/components/ui/date-range-picker" // If you have one, otherwise use two Inputs
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'
import { ArrowUp, ArrowDown, Users, MousePointerClick, Package, DollarSign, Calendar, ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

interface AnalyticsData {
  clicksByProduct: Record<string, number>
  clicksByInterval: Record<string, number>
  mostPopular: { productId: string; title: string; count: number }[]
  totalClicks: number
  productTitles: Record<string, string>
}

interface ProductOption {
  id: string
  title: string
}

interface StatCard {
  title: string
  value: string | number
  change: number
  timeframe: string
  icon: React.ReactNode
}

const inter = Inter({ subsets: ['latin'] })

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// Add counter animation hook
function useCounterAnimation(end: number, duration: number = 2000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const start = 0
    const step = end / (duration / 16) // 60fps
    let current = start
    const timer = setInterval(() => {
      current += step
      if (current >= end) {
        setValue(end)
        clearInterval(timer)
      } else {
        setValue(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])

  return value
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [interval, setInterval] = useState("daily")
  const [timeRange, setTimeRange] = useState("year")
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null)
  const [products, setProducts] = useState<ProductOption[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>("all")
  const [compareMode, setCompareMode] = useState(false)
  const [compareDateRange, setCompareDateRange] = useState<{ start: string; end: string } | null>(null)
  const [compareAnalytics, setCompareAnalytics] = useState<AnalyticsData | null>(null)

  // Fetch all products for the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/storefronts?userId=current")
        if (!res.ok) return
        const data = await res.json()
        if (data.products) {
          setProducts(data.products.map((p: { id: string; title: string }) => ({ id: p.id, title: p.title })))
        }
      } catch {}
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      setError(null)
      try {
        let url = `/api/analytics?interval=${interval}`
        if (dateRange) {
          url += `&range=${dateRange.start}_to_${dateRange.end}`
        }
        if (selectedProduct && selectedProduct !== "all") {
          url += `&productId=${selectedProduct}`
        }
        const res = await fetch(url)
        if (!res.ok) throw new Error("Failed to fetch analytics")
        const data = await res.json()
        setAnalytics(data)

        // If compare mode, fetch comparison analytics
        if (compareMode && compareDateRange?.start && compareDateRange?.end) {
          let compareUrl = `/api/analytics?interval=${interval}`
          compareUrl += `&range=${compareDateRange.start}_to_${compareDateRange.end}`
          if (selectedProduct && selectedProduct !== "all") {
            compareUrl += `&productId=${selectedProduct}`
          }
          const compareRes = await fetch(compareUrl)
          if (!compareRes.ok) throw new Error("Failed to fetch comparison analytics")
          const compareData = await compareRes.json()
          setCompareAnalytics(compareData)
        } else {
          setCompareAnalytics(null)
        }
      } catch {
        setError("Failed to load analytics data")
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [interval, dateRange, selectedProduct, compareMode, compareDateRange])

  const stats: StatCard[] = [
    {
      title: 'Total Users',
      value: '40,689',
      change: 8.5,
      timeframe: 'from yesterday',
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: 'Total Clicks',
      value: analytics?.totalClicks || '20,586',
      change: 8.5,
      timeframe: 'from yesterday',
      icon: <MousePointerClick className="h-4 w-4" />,
    },
    {
      title: 'Total Products',
      value: analytics?.mostPopular.length || '10,293',
      change: 1.3,
      timeframe: 'from past week',
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: 'Total Revenue',
      value: '$89,000',
      change: -4.3,
      timeframe: 'from yesterday',
      icon: <DollarSign className="h-4 w-4" />,
    },
  ]

  const StatCard = ({ stat }: { stat: StatCard }) => {
    const animatedValue = useCounterAnimation(Number(stat.value.toString().replace(/[^0-9]/g, '')))
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <div className={cn(
          "p-6 rounded-xl backdrop-blur-sm transition-all duration-300",
          "bg-gradient-to-br shadow-lg hover:shadow-xl",
          "border border-white/10",
          stat.change >= 0 
            ? "from-green-50/80 to-white/90 hover:from-green-50/90 hover:to-white" 
            : "from-red-50/80 to-white/90 hover:from-red-50/90 hover:to-white",
          inter.className
        )}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                {typeof stat.value === 'number' ? animatedValue : stat.value}
              </p>
            </div>
            <div className={cn(
              "rounded-full p-3 transition-colors duration-200",
              stat.change >= 0 
                ? "bg-green-50 text-green-600 hover:bg-green-100" 
                : "bg-red-50 text-red-600 hover:bg-red-100"
            )}>
              {stat.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              stat.change >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {stat.change >= 0 ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              {Math.abs(stat.change)}%
            </div>
            <p className="text-sm text-gray-500">{stat.timeframe}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-spin border-t-transparent"></div>
          </div>
          <p className="mt-4 text-gray-600 animate-pulse">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg font-medium">Error loading analytics</p>
          <p className="mt-2 text-sm text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  const engagementData = Object.entries(analytics?.clicksByInterval || {}).map(([date, count]) => ({
    date,
    users: Math.floor(count * 1.5),
    clicks: count,
  }))

  return (
    <div className={cn("space-y-8", inter.className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Analytics Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">Track your storefront performance and user engagement</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 hours</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Custom Range
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 backdrop-blur-sm bg-white/80 hover:bg-white/90 transition-all duration-300 border border-gray-100 shadow-lg hover:shadow-xl rounded-xl">
            <h3 className="text-lg font-medium text-gray-900">Engagement Overview</h3>
            <p className="mt-1 text-sm text-gray-500">User engagement over time</p>
            <div className="mt-4 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="users" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUsers)" />
                  <Area type="monotone" dataKey="clicks" stroke="#10B981" fillOpacity={1} fill="url(#colorClicks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 backdrop-blur-sm bg-white/80 hover:bg-white/90 transition-all duration-300 border border-gray-100 shadow-lg hover:shadow-xl rounded-xl">
            <h3 className="text-lg font-medium text-gray-900">Product Performance</h3>
            <p className="mt-1 text-sm text-gray-500">Top performing products</p>
            <div className="mt-4 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.mostPopular.slice(0, 5).map(item => ({
                  name: item.title,
                  clicks: item.count
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Filters and Controls */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Select value={interval} onValueChange={setInterval}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={compareMode ? "default" : "outline"}
              onClick={() => setCompareMode(!compareMode)}
            >
              Compare Periods
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Comparison Section */}
      {compareMode && (
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Period Comparison</h3>
          <p className="mt-1 text-sm text-gray-500">Compare performance between two time periods</p>
          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Current Period</h4>
              <div className="mt-2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="clicks" stroke="#3B82F6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Comparison Period</h4>
              <div className="mt-2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={compareAnalytics ? Object.entries(compareAnalytics.clicksByInterval).map(([date, count]) => ({
                    date,
                    clicks: count
                  })) : []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="clicks" stroke="#10B981" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
} 