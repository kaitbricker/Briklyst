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
import { ArrowUp, ArrowDown, Users, MousePointerClick, Package, DollarSign, Calendar, ChevronDown, Sun, Moon, Download, TrendingUp, TrendingDown, BarChart2, Mail, PlusCircle, Palette, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'

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

// Shimmer loading effect component
const ShimmerEffect = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
    <div className="h-32 w-full bg-gray-200 rounded-xl"></div>
  </div>
)

// Enhanced tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <p className="text-sm text-gray-600">
              {entry.name}: <span className="font-medium">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsDashboard() {
  const { theme, setTheme } = useTheme()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [interval, setInterval] = useState("daily")
  const [timeRange, setTimeRange] = useState("7d")
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null)
  const [products, setProducts] = useState<ProductOption[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>("all")
  const [compareMode, setCompareMode] = useState(false)
  const [compareDateRange, setCompareDateRange] = useState<{ start: string; end: string } | null>(null)
  const [compareAnalytics, setCompareAnalytics] = useState<AnalyticsData | null>(null)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalClicks, setTotalClicks] = useState(0)
  const [conversionRate, setConversionRate] = useState(0)
  const [emailSubscribers, setEmailSubscribers] = useState(0)
  const [revenueData, setRevenueData] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [timeFilter, setTimeFilter] = useState('week')
  const [mockClicks, setMockClicks] = useState({ 
    week: 0, 
    month: 0,
    topProducts: [
      { title: "Product A", clicks: 40 },
      { title: "Product B", clicks: 32 },
      { title: "Product C", clicks: 25 },
      { title: "Product D", clicks: 18 },
      { title: "Product E", clicks: 8 },
    ]
  })
  const [mockEmailStats, setMockEmailStats] = useState({ sent: 0, openRate: 0, clickRate: 0, lastCampaign: { name: '', sent: '', openRate: 0, clickRate: 0 } })

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

  useEffect(() => {
    // Mock data for demonstration
    const mockData = () => {
      setTotalRevenue(1234.56)
      setTotalClicks(1234)
      setConversionRate(3.2)
      setEmailSubscribers(567)
      setRevenueData([
        { date: 'Jan', revenue: 400 },
        { date: 'Feb', revenue: 300 },
        { date: 'Mar', revenue: 600 },
        { date: 'Apr', revenue: 800 },
        { date: 'May', revenue: 1000 },
        { date: 'Jun', revenue: 1200 },
      ])
      setTopProducts([
        { name: 'Product A', clicks: 400 },
        { name: 'Product B', clicks: 300 },
        { name: 'Product C', clicks: 600 },
        { name: 'Product D', clicks: 800 },
        { name: 'Product E', clicks: 1000 },
      ])
      setMockClicks({ 
        week: 1234, 
        month: 2345,
        topProducts: [
          { title: "Product A", clicks: 40 },
          { title: "Product B", clicks: 32 },
          { title: "Product C", clicks: 25 },
          { title: "Product D", clicks: 18 },
          { title: "Product E", clicks: 8 },
        ]
      })
      setMockEmailStats({ sent: 1000, openRate: 42, clickRate: 18, lastCampaign: { name: 'Summer Sale', sent: '1000', openRate: 42, clickRate: 18 } })
    }
    mockData()
  }, [timeRange])

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
    const isPositive = stat.change >= 0
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <div className={cn(
          "p-6 rounded-2xl backdrop-blur-sm transition-all duration-300",
          "bg-gradient-to-br shadow-md hover:shadow-lg",
          "border border-gray-100",
          isPositive
            ? "from-green-50/90 to-white hover:from-green-50"
            : "from-red-50/90 to-white hover:from-red-50",
          inter.className
        )}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                {typeof stat.value === 'number' ? animatedValue : stat.value}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stat.title} {isPositive ? '↑' : '↓'} {Math.abs(stat.change)}% vs {stat.timeframe}
              </p>
            </div>
            <div className={cn(
              "rounded-xl p-3 transition-colors duration-200",
              isPositive
                ? "bg-green-50 text-green-600 hover:bg-green-100"
                : "bg-red-50 text-red-600 hover:bg-red-100"
            )}>
              {stat.icon}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
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
    <div className={cn(
      "min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f1f5f9] space-y-8 p-8",
      inter.className
    )}>
      {/* Header with Theme Toggle */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Analytics Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">Track your storefront performance and user engagement</p>
        </motion.div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
              <SelectItem value="day" className="hover:bg-gray-100 cursor-pointer">Last 24 hours</SelectItem>
              <SelectItem value="week" className="hover:bg-gray-100 cursor-pointer">Last 7 days</SelectItem>
              <SelectItem value="month" className="hover:bg-gray-100 cursor-pointer">Last 30 days</SelectItem>
              <SelectItem value="year" className="hover:bg-gray-100 cursor-pointer">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2 bg-white hover:bg-gray-50 transition-colors border border-gray-200"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

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
          <Card className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-900">Engagement Overview</h3>
            <p className="mt-1 text-sm text-gray-500">User engagement over time</p>
            <div className="mt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorUsers)"
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#10B981" 
                    fillOpacity={1} 
                    fill="url(#colorClicks)"
                    strokeWidth={2}
                  />
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
          <Card className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-medium text-gray-900">Product Performance</h3>
            <p className="mt-1 text-sm text-gray-500">Top performing products</p>
            <div className="mt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={analytics?.mostPopular.slice(0, 5).map(item => ({
                    name: item.title,
                    clicks: item.count
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="clicks" 
                    fill="#3B82F6"
                    radius={[6, 6, 0, 0]}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Filters and Controls */}
      <Card className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Select value={interval} onValueChange={setInterval}>
              <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                <SelectItem value="hourly" className="hover:bg-gray-100 cursor-pointer">Hourly</SelectItem>
                <SelectItem value="daily" className="hover:bg-gray-100 cursor-pointer">Daily</SelectItem>
                <SelectItem value="weekly" className="hover:bg-gray-100 cursor-pointer">Weekly</SelectItem>
                <SelectItem value="monthly" className="hover:bg-gray-100 cursor-pointer">Monthly</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[180px] bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 transition-colors">
                <SelectValue placeholder="All Products" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                <SelectItem value="all" className="hover:bg-gray-100 cursor-pointer">All Products</SelectItem>
                {products.map((product) => (
                  <SelectItem 
                    key={product.id} 
                    value={product.id}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
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
              className={cn(
                "gap-2 transition-all duration-200",
                compareMode 
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-50 border border-gray-200"
              )}
            >
              <TrendingUp className="h-4 w-4" />
              Compare Periods
            </Button>
            <Button 
              variant="outline"
              className="gap-2 bg-white hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Comparison Section */}
      {compareMode && (
        <Card className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-medium text-gray-900">Period Comparison</h3>
          <p className="mt-1 text-sm text-gray-500">Compare performance between two time periods</p>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Current Period</h4>
              <div className="mt-4 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={engagementData}>
                    <defs>
                      <linearGradient id="colorCurrentPeriod" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="clicks" 
                      stroke="#3B82F6" 
                      fillOpacity={1} 
                      fill="url(#colorCurrentPeriod)"
                      strokeWidth={2}
                      className="transition-all duration-300"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Comparison Period</h4>
              <div className="mt-4 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={compareAnalytics ? Object.entries(compareAnalytics.clicksByInterval).map(([date, count]) => ({
                      date,
                      clicks: count
                    })) : []}
                  >
                    <defs>
                      <linearGradient id="colorComparePeriod" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="clicks" 
                      stroke="#10B981" 
                      fillOpacity={1} 
                      fill="url(#colorComparePeriod)"
                      strokeWidth={2}
                      className="transition-all duration-300"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Current Period</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Comparison Period</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {compareAnalytics && (
                <div className="flex items-center gap-2">
                  <span>Difference:</span>
                  <span className={cn(
                    "font-medium",
                    (analytics?.totalClicks || 0) > (compareAnalytics?.totalClicks || 0)
                      ? "text-green-600"
                      : "text-red-600"
                  )}>
                    {((analytics?.totalClicks || 0) - (compareAnalytics?.totalClicks || 0)).toLocaleString()} clicks
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">
              +12.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailSubscribers}</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Store Performance and Email Engagement Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Storefront Performance Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2 text-blue-700"><BarChart2 size={20}/> Storefront Performance</h2>
              <div className="flex gap-2">
                <Button size="sm" variant={timeFilter === 'week' ? 'default' : 'outline'} onClick={() => setTimeFilter('week')}>7 days</Button>
                <Button size="sm" variant={timeFilter === 'month' ? 'default' : 'outline'} onClick={() => setTimeFilter('month')}>30 days</Button>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-blue-700">{timeFilter === 'week' ? mockClicks.week : mockClicks.month}</div>
              <div className="text-gray-500">Total Clicks ({timeFilter === 'week' ? 'This Week' : 'This Month'})</div>
            </div>
            <div>
              <div className="font-semibold mb-2">Top 5 Products</div>
              <table className="w-full text-sm border-separate border-spacing-y-1">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th>Product</th>
                    <th>Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {mockClicks.topProducts.map((p, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="rounded-l-lg px-2 py-1">{p.title}</td>
                      <td className="rounded-r-lg px-2 py-1">{p.clicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Email Engagement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-700"><Mail size={20}/> Email Engagement</h2>
            <div className="mb-2">Emails Sent: <span className="font-semibold text-blue-700">{mockEmailStats.sent}</span></div>
            <div className="mb-2">Open Rate: <span className="font-semibold text-blue-700">{mockEmailStats.openRate}%</span></div>
            <div className="mb-2">Click-Through Rate: <span className="font-semibold text-blue-700">{mockEmailStats.clickRate}%</span></div>
            <div className="mt-4">
              <div className="font-semibold mb-1">Most Recent Campaign</div>
              <div className="text-gray-700">{mockEmailStats.lastCampaign.name}</div>
              <div className="text-gray-500 text-sm">Sent: {mockEmailStats.lastCampaign.sent} | Open: {mockEmailStats.lastCampaign.openRate}% | Click: {mockEmailStats.lastCampaign.clickRate}%</div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Access Actions */}
      <div className="max-w-4xl mx-auto mt-10 flex flex-wrap gap-4 justify-center">
        <Button asChild className="flex items-center gap-2">
          <Link href="/dashboard/products" className="flex items-center gap-2">
            <PlusCircle size={18}/>
            Add New Product
          </Link>
        </Button>
        <Button asChild variant="secondary" className="flex items-center gap-2">
          <Link href="/dashboard/storefront" className="flex items-center gap-2">
            <Palette size={18}/>
            Customize Storefront
          </Link>
        </Button>
        <Button asChild variant="secondary" className="flex items-center gap-2">
          <Link href="/dashboard/settings" className="flex items-center gap-2">
            <Settings size={18}/>
            Account Settings
          </Link>
        </Button>
      </div>
    </div>
  )
} 