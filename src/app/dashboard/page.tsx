"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { data: session } = useSession()
  const user = session?.user
  const username = user?.name ? user.name.replace(/\s+/g, '').toLowerCase() : ""

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="flex items-center gap-8">
          <span className="font-bold text-xl">Briklyst</span>
          <Link href="/dashboard" className="text-gray-700 hover:underline">Dashboard</Link>
          <Link href={`/storefront/${username}`} className="text-gray-700 hover:underline">Storefront</Link>
          <Link href="/dashboard/manage-products" className="text-gray-700 hover:underline">Manage Products</Link>
          <Link href="/dashboard/emails" className="text-gray-700 hover:underline">Email Tools</Link>
          <Link href="/dashboard/settings" className="text-gray-700 hover:underline">Settings</Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">{user?.email}</span>
          <Link href="/api/auth/signout" className="text-red-600 hover:underline">Sign out</Link>
        </div>
      </nav>

      {/* User Info Panel */}
      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="text-lg font-semibold">{user?.name}</div>
          <div className="text-gray-500 text-sm">@{username}</div>
          <div className="text-gray-500 text-sm">{user?.email}</div>
          <div className="text-gray-500 text-sm mt-1">Plan: Free</div>
          <Link href={`/storefront/${username}`} className="text-blue-600 underline mt-2 inline-block">View Public Storefront</Link>
        </div>
      </div>

      {/* Analytics & Quick Actions */}
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Storefront Performance Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Storefront Performance</h2>
          <div className="text-gray-500">[Product click analytics will go here]</div>
        </div>
        {/* Email Engagement */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Email Engagement</h2>
          <div className="text-gray-500">[Email stats will go here]</div>
        </div>
      </div>

      {/* Quick Access Actions */}
      <div className="max-w-4xl mx-auto mt-8 flex flex-wrap gap-4">
        <Button asChild><Link href="/dashboard/manage-products">Add New Product</Link></Button>
        <Button asChild variant="secondary"><Link href="/dashboard/emails">Create Email Campaign</Link></Button>
        <Button asChild variant="secondary"><Link href="/dashboard/settings">Customize Storefront Theme</Link></Button>
        <Button asChild variant="secondary"><Link href="/dashboard/collaborators">Invite a Collaborator</Link></Button>
      </div>

      {/* Settings Access */}
      <div className="max-w-4xl mx-auto mt-8 mb-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <Link href="/dashboard/settings" className="text-blue-600 underline">Go to Account Settings</Link>
        </div>
      </div>
    </div>
  )
} 