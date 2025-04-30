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
    setForm({ ...form, [e.target.name]: e.target.value })
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
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
      </form>
    </div>
  )
} 