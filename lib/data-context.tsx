"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { TravelPackage, Booking, Review } from "./types"

interface DataContextType {
  packages: TravelPackage[]
  bookings: Booking[]
  reviews: Review[]
  addBooking: (booking: Booking) => void
  cancelBooking: (bookingId: string) => void
  addReview: (review: Review) => void
  getFavorites: (userId: string) => string[]
  toggleFavorite: (userId: string, packageId: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const initialPackages: TravelPackage[] = [
  {
    id: "1",
    destination: "Bali, Indonesia",
    country: "Indonesia",
    image: "bali.jpg", // ✅ FIXED
    price: 60999,
    currency: "₹",
    duration: 7,
    description:
      "Experience the magic of Bali with pristine beaches, ancient temples, and vibrant culture.",
    category: "beach",
    rating: 4.8,
    reviews: 245,
    highlights: ["Temple tours", "Beach clubs", "Rice terraces", "Spa treatments"],
    included: ["5-star hotel", "Daily breakfast", "Airport transfer", "Guided tours"],
    maxGroupSize: 20,
    availableDates: ["2025-03-01", "2025-03-15", "2025-04-01"],
  },
   {
    id: "2",
    destination: "Istanbul, Turkey",
    country: "Turkey",
    image: "/istanbul.jpg", // ✅ FIXED
    price: 85999,
    currency: "₹",
    duration: 10,
    description:
      "Experience  A bridge between East and West, rich in history and stunning architecture.",
    category: "city",
    rating: 4.9,
    reviews: 140,
    highlights: ["Temple tours", "Bridge tour", "Museums", "Turkish bath"],
    included: ["5-star hotel", "Daily breakfast", "Airport transfer", "Guided tours"],
    maxGroupSize: 15,
    availableDates: ["2025-03-01", "2025-03-15", "2025-04-01"],
  },
    {
    id: "3",
    destination: "Ladakh & Kashmir, India",
    country: "India",
    image: "/ladakh.jpg", // ✅ FIXED
    price: 29999,
    currency: "₹",
    duration: 13,
    description:
      "Experience High-altitude landscapes and serene beauty.",
    category: "mountain",
    rating: 4.9,
    reviews: 260,
    highlights: ["High Altitude lake", "Diskit Monastery", "Magnetic Hills", "Spiritual Sites"],
    included: ["5-star hotel", "Daily breakfast", "Airport transfer", "Guided tours"],
    maxGroupSize: 15,
    availableDates: ["2025-03-01", "2025-03-15", "2025-04-01"],
  },
  {
    id: "4",
    destination: "Paris,France",
    country: "France",
    image: "/paris.jpg", // ✅ FIXED
    price: 129999,
    currency: "₹",
    duration: 13,
    description:
      "offers iconic sights like the Eiffel Tower and Louvre Museum, charming cafés, Seine River cruises, and world-class art and food.",
    category: "city",
    rating: 5.0,
    reviews: 260,
    highlights: ["Charming Cafes", "River Cruises", "Eiffel Tower", "Louvre Museum"],
    included: ["5-star hotel", "Daily breakfast", "Airport transfer", "Guided tours"],
    maxGroupSize: 15,
    availableDates: ["2025-03-01", "2025-03-15", "2025-04-01"],
  },
  {
    id: "5",
    destination: "Krabi, Thailand",
    country: "Thailand",
    image: "/krabi.jpg", // ✅ FIXED
    price: 59000,
    currency: "₹",
    duration: 7,
    description:
      "tunning limestone cliffs, white-sand beaches (like Railay & Phi Phi Islands), clear turquoise waters perfect for snorkeling/diving, and lush jungles with waterfalls, ideal for adventure.",
    category: "adventure",
    rating: 4.9,
    reviews: 65999,
    highlights: ["Emerald pools & Hot Springs", "Tiger Cave Temple", "Phi Phi Islands", "Spiritual Sites"],
    included: ["5-star hotel", "Daily breakfast", "Airport transfer", "Guided tours"],
    maxGroupSize: 15,
    availableDates: ["2025-03-01", "2025-03-15", "2025-04-01"],
  },
  {
    id: "6",
    destination: "Rome, Italy",
    country: "Italy",
    image: "/rome1.jpg", // ✅ FIXED
    price: 159999,
    currency: "₹",
    duration: 15,
    description:
      "A Rome vacation offers rich history, art, and vibrant culture,exploring charming streets, and enjoying Italian cuisine.",
    category: "city",
    rating: 4.8,
    reviews: 260,
    highlights: ["Fountains & squares", "Colosseum", "Vatican City", "Ancient Rome"],
    included: ["5-star hotel", "Daily breakfast", "Airport transfer", "Guided tours"],
    maxGroupSize: 30,
    availableDates: ["2025-03-01", "2025-03-15", "2025-04-01"],
  },
  
]

export function DataProvider({ children }: { children: ReactNode }) {
  const [packages, setPackages] = useState<TravelPackage[]>(initialPackages)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings")
    const storedReviews = localStorage.getItem("reviews")
    const storedPackages = localStorage.getItem("packages")

    if (storedBookings) setBookings(JSON.parse(storedBookings))
    if (storedReviews) setReviews(JSON.parse(storedReviews))
    if (storedPackages) setPackages(JSON.parse(storedPackages))
  }, [])

  const addBooking = (booking: Booking) => {
    const updated = [...bookings, booking]
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))
  }

  const cancelBooking = (bookingId: string) => {
    const updated = bookings.map((b: Booking) =>
      b.id === bookingId ? { ...b, status: "cancelled" } : b,
    )
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))
  }

  const addReview = (review: Review) => {
    const updatedReviews = [...reviews, review]
    setReviews(updatedReviews)
    localStorage.setItem("reviews", JSON.stringify(updatedReviews))

    const reviewsForPackage = updatedReviews.filter(
      (r: Review) => r.packageId === review.packageId,
    )

    const avgRating =
      reviewsForPackage.reduce((sum, r) => sum + r.rating, 0) /
      reviewsForPackage.length

    const updatedPackages = packages.map((p: TravelPackage) =>
      p.id === review.packageId
        ? { ...p, rating: avgRating, reviews: reviewsForPackage.length }
        : p,
    )

    setPackages(updatedPackages)
    localStorage.setItem("packages", JSON.stringify(updatedPackages))
  }

  const getFavorites = (userId: string): string[] => {
    return JSON.parse(localStorage.getItem(`favorites_${userId}`) || "[]")
  }

  const toggleFavorite = (userId: string, packageId: string) => {
    const favorites = getFavorites(userId)
    const index = favorites.indexOf(packageId)

    index > -1 ? favorites.splice(index, 1) : favorites.push(packageId)

    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites))
  }

  return (
    <DataContext.Provider
      value={{
        packages,
        bookings,
        reviews,
        addBooking,
        cancelBooking,
        addReview,
        getFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within DataProvider")
  }
  return context
}
