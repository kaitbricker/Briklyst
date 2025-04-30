"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Select } from "@/components/ui/select"
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
} from 'recharts'
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

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [interval, setInterval] = useState("daily")
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
          setProducts(data.products.map((p: any) => ({ id: p.id, title: p.title })))
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

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      <div className="flex flex-wrap gap-4 items-end">
        {/* Date Range Picker */}
        {/* Replace with your own date picker if needed */}
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <Input
            type="date"
            value={dateRange?.start || ""}
            onChange={e => setDateRange(r => ({ start: e.target.value, end: r?.end || "" }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <Input
            type="date"
            value={dateRange?.end || ""}
            onChange={e => setDateRange(r => ({ end: e.target.value, start: r?.start || "" }))}
          />
        </div>
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            id="compareMode"
            checked={compareMode}
            onChange={e => setCompareMode(e.target.checked)}
          />
          <label htmlFor="compareMode" className="text-sm">Compare to another date range</label>
        </div>
        {compareMode && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Compare Start</label>
              <Input
                type="date"
                value={compareDateRange?.start || ""}
                onChange={e => setCompareDateRange(r => ({ start: e.target.value, end: r?.end || "" }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Compare End</label>
              <Input
                type="date"
                value={compareDateRange?.end || ""}
                onChange={e => setCompareDateRange(r => ({ end: e.target.value, start: r?.start || "" }))}
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Interval</label>
          <select
            className="border rounded px-2 py-1"
            value={interval}
            onChange={e => setInterval(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product</label>
          <select
            className="border rounded px-2 py-1 min-w-[180px]"
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
          >
            <option value="">All Products</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
        <Button
          onClick={() => {
            // Export CSV functionality placeholder
            if (!analytics) return
            const rows = [
              ["Product", "Clicks", "CTR (%)"],
              ...Object.entries(analytics.clicksByProduct).map(([id, count]) => [
                analytics.productTitles[id],
                count,
                analytics.totalClicks > 0 ? ((count / analytics.totalClicks) * 100).toFixed(2) : '0.00',
              ]),
            ]
            const csv = rows.map(r => r.join(",")).join("\n")
            const blob = new Blob([csv], { type: "text/csv" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "analytics.csv"
            a.click()
            URL.revokeObjectURL(url)
          }}
          variant="outline"
        >
          Export CSV
        </Button>
      </div>
      {loading && <div>Loading analytics...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {analytics && (
        <div className="space-y-8">
          {/* Click Trends Chart */}
          <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Click Trends</h2>
              <span className="text-sm text-gray-500">Total Clicks: {analytics.totalClicks}</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={Object.entries(analytics.clicksByInterval).map(([date, count]) => ({ date, count, compare: compareAnalytics?.clicksByInterval[date] || 0 }))}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#6366f1" name="Clicks" />
                {compareMode && compareAnalytics && (
                  <Line type="monotone" dataKey="compare" stroke="#f59e42" name="Compare Clicks" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Most Popular Products Chart */}
          <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Most Popular Products</h2>
              <span className="text-sm text-gray-500">CTR = Clicks / Total Clicks</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={analytics.mostPopular.map(p => ({
                  name: p.title,
                  clicks: p.count,
                  ctr: analytics.totalClicks > 0 ? ((p.count / analytics.totalClicks) * 100) : 0,
                  compareClicks: compareAnalytics?.mostPopular.find(cp => cp.productId === p.productId)?.count || 0,
                  compareCtr: compareAnalytics && compareAnalytics.totalClicks > 0
                    ? ((compareAnalytics.mostPopular.find(cp => cp.productId === p.productId)?.count || 0) / compareAnalytics.totalClicks) * 100
                    : 0,
                }))}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value: any, name: string) => name?.toLowerCase().includes('ctr') ? `${value.toFixed(2)}%` : value} />
                <Legend />
                <Bar dataKey="clicks" fill="#10b981" name="Clicks" />
                {compareMode && compareAnalytics && (
                  <Bar dataKey="compareClicks" fill="#f59e42" name="Compare Clicks" />
                )}
                <Bar dataKey="ctr" fill="#6366f1" name="CTR (%)" yAxisId={1} />
                {compareMode && compareAnalytics && (
                  <Bar dataKey="compareCtr" fill="#f43f5e" name="Compare CTR (%)" yAxisId={1} />
                )}
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="py-1">Product</th>
                    <th className="py-1">Clicks</th>
                    <th className="py-1">CTR (%)</th>
                    {compareMode && <th className="py-1">Compare Clicks</th>}
                    {compareMode && <th className="py-1">Compare CTR (%)</th>}
                  </tr>
                </thead>
                <tbody>
                  {analytics.mostPopular.map(p => {
                    const compareP = compareAnalytics?.mostPopular.find(cp => cp.productId === p.productId)
                    return (
                      <tr key={p.productId} className="border-t">
                        <td className="py-1">{p.title}</td>
                        <td className="py-1">{p.count}</td>
                        <td className="py-1">{analytics.totalClicks > 0 ? ((p.count / analytics.totalClicks) * 100).toFixed(2) : '0.00'}</td>
                        {compareMode && <td className="py-1">{compareP?.count ?? 0}</td>}
                        {compareMode && <td className="py-1">{compareAnalytics && compareAnalytics.totalClicks > 0 ? ((compareP?.count || 0) / compareAnalytics.totalClicks * 100).toFixed(2) : '0.00'}</td>}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* Product Click Share Pie Chart */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Product Click Share</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.mostPopular.map(p => ({ name: p.title, value: p.count }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {analytics.mostPopular.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={["#6366f1", "#10b981", "#f59e42", "#f43f5e", "#3b82f6", "#fbbf24"][idx % 6]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Click-Through Rates Section */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Click-Through Rates</h2>
            <div>
              <span className="font-medium">Overall CTR:</span>{' '}
              <span className="text-blue-600 font-semibold">
                {analytics.totalClicks > 0 && analytics.mostPopular.length > 0
                  ? (
                      analytics.mostPopular.reduce((acc, p) => acc + (p.count / analytics.totalClicks), 0) /
                    analytics.mostPopular.length * 100
                    ).toFixed(2)
                  : '0.00'}%
              </span>
              {compareMode && compareAnalytics && (
                <>
                  <span className="ml-4 font-medium">Compare CTR:</span>{' '}
                  <span className="text-orange-600 font-semibold">
                    {compareAnalytics.totalClicks > 0 && compareAnalytics.mostPopular.length > 0
                      ? (
                          compareAnalytics.mostPopular.reduce((acc, p) => acc + (p.count / compareAnalytics.totalClicks), 0) /
                        compareAnalytics.mostPopular.length * 100
                        ).toFixed(2)
                      : '0.00'}%
                  </span>
                </>
              )}
            </div>
            <div className="text-gray-500 mt-2 text-sm">
              (CTR = Clicks for product / Total Clicks in range)
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 