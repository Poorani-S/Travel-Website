"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useData } from "@/lib/data-context"
import { useAuth } from "@/lib/auth-context"
import { Star, MapPin, Calendar, Users, Check, Heart } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { ReviewSection } from "@/components/review-section"
import { BookingForm } from "@/components/booking-form"

export default function PackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { packages, getFavorites, toggleFavorite } = useData()
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(user ? getFavorites(user.id).includes(params.id as string) : false)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const pkg = packages.find((p) => p.id === params.id)

  if (!pkg) {
    return (
      <main className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Package not found</h1>
            <button onClick={() => router.push("/destinations")} className="text-primary hover:underline">
              Back to destinations
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const handleFavorite = () => {
    if (!user) {
      router.push("/login")
      return
    }
    toggleFavorite(user.id, pkg.id)
    setIsFavorite(!isFavorite)
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Image Hero */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image src={pkg.image || "/placeholder.svg"} alt={pkg.destination} fill className="object-cover" />
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold capitalize">
          {pkg.category}
        </div>
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{pkg.destination}</h1>
              <p className="text-muted-foreground flex items-center gap-1 mb-4">
                <MapPin className="w-4 h-4" />
                {pkg.country}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{pkg.rating}</span>
                  <span className="text-muted-foreground">({pkg.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Package</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{pkg.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Trip Highlights</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {pkg.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Included */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">What's Included</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {pkg.included.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <ReviewSection packageId={pkg.id} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-20">
              {/* Price */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                <p className="text-4xl font-bold text-primary">
                  {pkg.currency} {pkg.price.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">per person</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold text-foreground">{pkg.duration} Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Group Size</p>
                    <p className="font-semibold text-foreground">Max {pkg.maxGroupSize} people</p>
                  </div>
                </div>
              </div>

              {/* Booking Button */}
              <button
                onClick={() => {
                  if (!user) {
                    router.push("/login")
                  } else {
                    setShowBookingForm(true)
                  }
                }}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold mb-3"
              >
                Book Now
              </button>

              {/* Available Dates */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Available Dates</p>
                <div className="space-y-2">
                  {pkg.availableDates.map((date) => (
                    <div
                      key={date}
                      className="text-sm text-muted-foreground bg-muted p-2 rounded flex items-center justify-between"
                    >
                      <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && <BookingForm package={pkg} onClose={() => setShowBookingForm(false)} />}

      <Footer />
    </main>
  )
}
