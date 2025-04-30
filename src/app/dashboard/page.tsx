"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BarChart2, Mail, PlusCircle, Palette, Users, Settings } from "lucide-react"
import Image from "next/image"

const mockClicks = {
  week: 123,
  month: 456,
  topProducts: [
    { title: "Product A", clicks: 40 },
    { title: "Product B", clicks: 32 },
    { title: "Product C", clicks: 25 },
    { title: "Product D", clicks: 18 },
    { title: "Product E", clicks: 8 },
  ],
}

const mockEmailStats = {
  sent: 12,
  openRate: 58,
  clickRate: 22,
  lastCampaign: {
    name: "Spring Launch",
    sent: 200,
    openRate: 62,
    clickRate: 25,
  },
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const user = session?.user
  const username = user?.name ? user.name.replace(/\s+/g, '').toLowerCase() : ""
  const [timeFilter, setTimeFilter] = useState<'week' | 'month'>('week')

  // Helper for avatar initials
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : (user?.email?.[0]?.toUpperCase() || "U")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-8">
          <span className="font-bold text-xl tracking-tight">Briklyst</span>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
          <Link href={`/storefront/${username}`} className="text-gray-700 hover:text-blue-600 transition">Storefront</Link>
          <Link href="/dashboard/manage-products" className="text-gray-700 hover:text-blue-600 transition">Manage Products</Link>
          <Link href="/dashboard/emails" className="text-gray-700 hover:text-blue-600 transition">Email Tools</Link>
          <Link href="/dashboard/settings" className="text-gray-700 hover:text-blue-600 transition">Settings</Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm hidden sm:block">{user?.email}</span>
          <Link href="/api/auth/signout" className="text-red-600 hover:underline">Sign out</Link>
        </div>
      </nav>

      {/* User Info Panel */}
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-gray-100">
        <div className="flex items-center gap-4">
          {user?.image ? (
            <Image src={user.image} alt="avatar" width={64} height={64} className="w-16 h-16 rounded-full object-cover border" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500 border">
              {initials}
            </div>
          )}
          <div>
            <div className="text-lg font-semibold">{user?.name}</div>
            <div className="text-gray-500 text-sm">@{username}</div>
            <div className="text-gray-500 text-sm">{user?.email}</div>
            <div className="text-gray-500 text-sm mt-1">Plan: <span className="font-medium text-green-600">Free</span></div>
            <Link href={`/storefront/${username}`} className="text-blue-600 underline mt-2 inline-block">View Public Storefront</Link>
          </div>
        </div>
      </div>

      {/* Analytics & Engagement */}
      <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Storefront Performance Overview */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
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
        </div>
        {/* Email Engagement */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-700"><Mail size={20}/> Email Engagement</h2>
          <div className="mb-2">Emails Sent: <span className="font-semibold text-blue-700">{mockEmailStats.sent}</span></div>
          <div className="mb-2">Open Rate: <span className="font-semibold text-blue-700">{mockEmailStats.openRate}%</span></div>
          <div className="mb-2">Click-Through Rate: <span className="font-semibold text-blue-700">{mockEmailStats.clickRate}%</span></div>
          <div className="mt-4">
            <div className="font-semibold mb-1">Most Recent Campaign</div>
            <div className="text-gray-700">{mockEmailStats.lastCampaign.name}</div>
            <div className="text-gray-500 text-sm">Sent: {mockEmailStats.lastCampaign.sent} | Open: {mockEmailStats.lastCampaign.openRate}% | Click: {mockEmailStats.lastCampaign.clickRate}%</div>
          </div>
        </div>
      </div>

      {/* Quick Access Actions */}
      <div className="max-w-4xl mx-auto mt-10 flex flex-wrap gap-4 justify-center">
        <Button asChild className="flex items-center gap-2"><PlusCircle size={18}/><Link href="/dashboard/manage-products">Add New Product</Link></Button>
        <Button asChild variant="secondary" className="flex items-center gap-2"><Mail size={18}/><Link href="/dashboard/emails">Create Email Campaign</Link></Button>
        <Button asChild variant="secondary" className="flex items-center gap-2"><Palette size={18}/><Link href="/dashboard/settings">Customize Storefront Theme</Link></Button>
        <Button asChild variant="secondary" className="flex items-center gap-2"><Users size={18}/><Link href="/dashboard/collaborators">Invite a Collaborator</Link></Button>
      </div>

      {/* Collaborator Activity Panel (Optional) */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-700"><Users size={20}/> Collaborator Activity</h2>
          <div className="text-gray-500">[Collaborator info and shared stats will go here]</div>
        </div>
      </div>

      {/* Settings Access */}
      <div className="max-w-4xl mx-auto mt-10 mb-12">
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-700"><Settings size={20}/> Settings</h2>
          <Link href="/dashboard/settings" className="text-blue-600 underline">Go to Account Settings</Link>
        </div>
      </div>
    </div>
  )
} 