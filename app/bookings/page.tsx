"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import {Footer} from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trash2, Mail, Phone } from "lucide-react"

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("travel-bookings")
    if (stored) {
      setBookings(JSON.parse(stored))
    }
  }, [])

  const handleDeleteBooking = (id) => {
    const updated = bookings.filter((b) => b.id !== id)
    setBookings(updated)
    localStorage.setItem("travel-bookings", JSON.stringify(updated))
  }

  const calculateDays = (checkIn, checkOut) => {
    return Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header bookingCount={bookings.length} />

      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">My Bookings</h1>
          <p className="text-lg text-muted-foreground">Manage and view your travel reservations</p>
        </div>
      </section>

      <div className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No bookings yet</h2>
            <p className="text-muted-foreground mb-6">Start planning your next adventure!</p>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => (window.location.href = "/")}
            >
              Browse Destinations
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden flex flex-col h-full">
                <CardHeader className="bg-primary/5 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground">{booking.destination.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{booking.destination.country}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pt-6 space-y-4">
                  {/* Guest Info */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {booking.firstName} {booking.lastName}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {booking.email}
                      </div>
                      {booking.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {booking.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div className="space-y-2 border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {calculateDays(booking.checkIn, booking.checkOut)} nights
                    </p>
                  </div>

                  {/* Guests */}
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {booking.guests} {booking.guests === "1" ? "Guest" : "Guests"}
                    </span>
                  </div>

                  {/* Special Requests */}
                  {booking.notes && (
                    <div className="bg-muted p-3 rounded-md border border-border">
                      <p className="text-xs font-medium text-foreground mb-1">Special Requests:</p>
                      <p className="text-xs text-muted-foreground">{booking.notes}</p>
                    </div>
                  )}
                </CardContent>

                <div className="border-t border-border p-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteBooking(booking.id)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Cancel Booking
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
