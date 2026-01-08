"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { User, Mail, Heart } from "lucide-react"
import { useData } from "@/lib/data-context"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { getFavorites, packages } = useData()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: user?.name || "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  if (!user) {
    router.push("/login")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    updateProfile({ name: formData.name })
    setSuccessMessage("Profile updated successfully!")

    setTimeout(() => setSuccessMessage(""), 3000)
    setIsSaving(false)
  }

  const favorites = getFavorites(user.id)
  const favoritePackages = packages.filter((p) => favorites.includes(p.id))

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground">My Profile</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Edit Profile</h2>

              {successMessage && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-sm">{successMessage}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Email cannot be changed</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Member Since</label>
                  <input
                    type="text"
                    value={new Date(user.createdAt).toLocaleDateString()}
                    disabled
                    className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>

          {/* Favorites Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-20">
              <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
                <Heart className="w-5 h-5 text-red-500" />
                Saved Destinations ({favorites.length})
              </h3>

              {favoritePackages.length > 0 ? (
                <div className="space-y-3">
                  {favoritePackages.map((pkg) => (
                    <a
                      key={pkg.id}
                      href={`/destinations/${pkg.id}`}
                      className="block p-3 bg-muted rounded-lg hover:bg-muted/80 transition"
                    >
                      <p className="font-medium text-foreground text-sm">{pkg.destination}</p>
                      <p className="text-xs text-muted-foreground">${pkg.price.toLocaleString()}</p>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No saved destinations yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
