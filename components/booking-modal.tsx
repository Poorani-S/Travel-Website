"use client"

import { useState } from "react"
import { Calendar, Users, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function BookingModal({ destination, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    notes: "",
  })

  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.checkIn || !formData.checkOut) {
      setError("Please fill in all required fields")
      return
    }

    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      setError("Check-out date must be after check-in date")
      return
    }

    onSubmit(destination, formData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-full max-w-md sm:max-w-lg md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-foreground">Book Your Stay</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">{destination.title}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Destination Info */}
          <div className="bg-muted p-3 sm:p-4 rounded-lg border border-border">
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-semibold">Location:</span> {destination.country}
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-xs sm:text-sm p-3 rounded-lg border border-destructive/20">
              {error}
            </div>
          )}

          {/* Personal Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">First Name *</label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                  className="mt-1 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Last Name *</label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                  className="mt-1 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email *
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
                className="mt-1 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="mt-1 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Travel Dates */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm sm:text-base text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Travel Dates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Check-In *</label>
                <Input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  required
                  className="mt-1 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-foreground">Check-Out *</label>
                <Input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  required
                  className="mt-1 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3">
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-2">
                <Users className="w-4 h-4" /> Number of Guests
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 text-xs sm:text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-foreground">Special Requests</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special requests or preferences..."
                className="w-full mt-1 px-3 py-2 text-xs sm:text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent text-xs sm:text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm"
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
