export interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: string
  preferences?: {
    favoriteDestinations: string[]
    currency: string
    notifications: boolean
  }
}

export interface TravelPackage {
  id: string
  destination: string
  country: string
  image: string
  price: number
  currency: string
  duration: number
  description: string
  category: "beach" | "mountain" | "city" | "adventure" | "cultural"
  rating: number
  reviews: number
  highlights: string[]
  included: string[]
  maxGroupSize: number
  availableDates: string[]
}

export interface Booking {
  id: string
  userId: string
  packageId: string
  travelDate: string
  numTravelers: number
  totalPrice: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  specialRequests: string
  createdAt: string
  paymentStatus: "unpaid" | "paid" | "refunded"
}

export interface Review {
  id: string
  packageId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}
