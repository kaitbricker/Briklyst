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
import { ArrowUp, ArrowDown, Users, MousePointerClick, Package, DollarSign, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
// import { LineChart, BarChart, PieChart } from 'recharts' // Will use when rendering charts

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

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [interval, setInterval] = useState("daily")
  const [timeRange, setTimeRange] = useState("year")
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null)
  const [products, setProducts] = useState<ProductOption[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>("")
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
        if (selectedProduct) {
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
          if (selectedProduct) {
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

  const StatCard = ({ stat }: { stat: StatCard }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{stat.title}</p>
          <p className="text-2xl font-semibold">{stat.value}</p>
        </div>
        <div className={`rounded-full p-2 ${stat.change >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          {stat.icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div
          className={`flex items-center gap-1 text-sm ${
            stat.change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {stat.change >= 0 ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
          {Math.abs(stat.change)}%
        </div>
        <p className="text-sm text-gray-500">{stat.timeframe}</p>
      </div>
    </Card>
  )

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto"></div>
          <p className="mt-4">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  const engagementData = Object.entries(analytics?.clicksByInterval || {}).map(([date, count]) => ({
    date,
    users: Math.floor(count * 1.5), // Mock user data
    clicks: count,
  }))

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Storefront Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year">Year</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-2 ${stat.change >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className={`flex items-center gap-1 text-sm ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {Math.abs(stat.change)}%
              </div>
              <p className="text-sm text-gray-500">{stat.timeframe}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Engagement Chart */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">User Engagement Analytics</h2>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97066" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F97066" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#F97066"
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* User Clicks Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-full">
                <MousePointerClick className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">User Clicks</h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">{analytics?.totalClicks || '20,586'}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center text-green-600">
                <ArrowUp className="h-4 w-4" />
                {Math.abs(8.5)}%
              </span>
              <span className="text-gray-500">Up from yesterday</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Active Users</h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">15,892</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center text-green-600">
                <ArrowUp className="h-4 w-4" />
                12.3%
              </span>
              <span className="text-gray-500">Up from last week</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 