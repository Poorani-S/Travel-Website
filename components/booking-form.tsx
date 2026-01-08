"use client"

import type React from "react"

import type { TravelPackage } from "@/lib/types"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { X, Calendar, Users, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface BookingFormProps {
  package: TravelPackage
  onClose: () => void
}

export function BookingForm({ package: pkg, onClose }: BookingFormProps) {
  const { user } = useAuth()
  const { addBooking } = useData()
  const router = useRouter()
  const [formData, setFormData] = useState({
    travelDate: pkg.availableDates[0] || "",
    numTravelers: 1,
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalPrice = pkg.price * formData.numTravelers

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)

    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      packageId: pkg.id,
      travelDate: formData.travelDate,
      numTravelers: formData.numTravelers,
      totalPrice,
      status: "pending" as const,
      specialRequests: formData.specialRequests,
      createdAt: new Date().toISOString(),
      paymentStatus: "unpaid" as const,
    }

    addBooking(booking)
    setIsSubmitting(false)
    onClose()
    router.push("/dashboard")
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold text-foreground">Book {pkg.destination}</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Travel Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Calendar className="w-4 h-4" />
              Travel Date
            </label>
            <select
              value={formData.travelDate}
              onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              required
            >
              {pkg.availableDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Users className="w-4 h-4" />
              Number of Travelers
            </label>
            <input
              type="number"
              min="1"
              max={pkg.maxGroupSize}
              value={formData.numTravelers}
              onChange={(e) => setFormData({ ...formData, numTravelers: Number.parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Maximum {pkg.maxGroupSize} travelers</p>
          </div>

          {/* Special Requests */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <FileText className="w-4 h-4" />
              Special Requests
            </label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="Any special dietary needs, accessibility requirements, etc."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Price Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per person:</span>
              <span className="font-semibold text-foreground">
                {pkg.currency} {pkg.price.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Travelers:</span>
              <span className="font-semibold text-foreground">{formData.numTravelers}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold text-foreground">Total:</span>
              <span className="text-xl font-bold text-primary">
                {pkg.currency} {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Complete Booking"}
          </button>

          <p className="text-xs text-center text-muted-foreground">
            You'll be able to proceed to payment on the next page
          </p>
        </form>
      </div>
    </div>
  )
}
