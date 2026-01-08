"use client"

import type { TravelPackage } from "@/lib/types"
import { Star, MapPin, Calendar, Users, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { useState } from "react"

interface PackageCardProps {
  package: TravelPackage
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  const { user } = useAuth()
  const { getFavorites, toggleFavorite } = useData()
  const [isFavorite, setIsFavorite] = useState(user ? getFavorites(user.id).includes(pkg.id) : false)

  const handleFavorite = () => {
    if (!user) {
      alert("Please login to save favorites")
      return
    }
    toggleFavorite(user.id, pkg.id)
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={pkg.image || "/placeholder.svg"}
          alt={pkg.destination}
          fill
          className="object-cover hover:scale-105 transition duration-300"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold capitalize">
          {pkg.category}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-foreground">{pkg.destination}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4" />
            {pkg.country}
          </p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{pkg.description}</p>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{pkg.rating}</span>
          </div>
          <span className="text-muted-foreground">({pkg.reviews} reviews)</span>
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {pkg.duration} days
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            Max {pkg.maxGroupSize}
          </div>
        </div>

        <div className="border-t border-border pt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-xl font-bold text-primary">
              {pkg.currency} {pkg.price.toLocaleString()}
            </p>
          </div>
          <Link
            href={`/destinations/${pkg.id}`}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
