"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ManageProfilePage() {
  const { data: session } = useSession()
  const user = session?.user
  const [form, setForm] = useState({
    profileImage: "",
    bio: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    emailAlerts: true,
    weeklyReport: true,
    monthlyReport: true,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        profileImage: user.profileImage || "",
        bio: user.bio || "",
        twitter: user.twitter || "",
        instagram: user.instagram || "",
        linkedin: user.linkedin || "",
        emailAlerts: user.emailAlerts ?? true,
        weeklyReport: user.weeklyReport ?? true,
        monthlyReport: user.monthlyReport ?? true,
      })
    }
  }, [user])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to update profile")
      toast({ title: "Profile updated!" })
    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Something went wrong", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, type, value, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-10 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="profileImage">Profile Image URL</Label>
          <Input id="profileImage" name="profileImage" value={form.profileImage} onChange={handleChange} placeholder="https://..." />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" value={form.bio} onChange={handleChange} maxLength={200} placeholder="Tell us about yourself (max 200 chars)" />
        </div>
        <div>
          <Label htmlFor="twitter">Twitter</Label>
          <Input id="twitter" name="twitter" value={form.twitter} onChange={handleChange} placeholder="username or full URL" />
        </div>
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input id="instagram" name="instagram" value={form.instagram} onChange={handleChange} placeholder="username or full URL" />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="username or full URL" />
        </div>
        <div className="pt-4 border-t mt-6">
          <h2 className="text-lg font-semibold mb-2">Email Preferences</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={form.emailAlerts}
                onChange={handleChange}
              />
              Email alerts for new clicks
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="weeklyReport"
                checked={form.weeklyReport}
                onChange={handleChange}
              />
              Weekly analytics report
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="monthlyReport"
                checked={form.monthlyReport}
                onChange={handleChange}
              />
              Monthly analytics report
            </label>
          </div>
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
      </form>
    </div>
  )
} 