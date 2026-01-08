"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Users, CheckCircle, Clock, X, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const { bookings, packages, cancelBooking } = useData()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  const userBookings = bookings.filter((b) => b.userId === user.id)

  const getPackageName = (packageId: string) => {
    return packages.find((p) => p.id === packageId)?.destination || "Unknown Destination"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {/* Stats Cards */}
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Bookings</p>
            <p className="text-3xl font-bold text-foreground">{userBookings.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Confirmed</p>
            <p className="text-3xl font-bold text-primary">
              {userBookings.filter((b) => b.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {userBookings.filter((b) => b.status === "pending").length}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-primary">
              ${userBookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Bookings List */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">My Bookings</h2>

          {userBookings.length > 0 ? (
            <div className="space-y-4">
              {userBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left Section */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{getPackageName(booking.packageId)}</h3>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.travelDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {booking.numTravelers} traveler{booking.numTravelers > 1 ? "s" : ""}
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <p className="text-sm text-muted-foreground italic">
                          <span className="font-medium">Note:</span> {booking.specialRequests}
                        </p>
                      )}
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col items-start md:items-end gap-3">
                      {/* Status Badge */}
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}
                      >
                        {booking.status === "confirmed" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : booking.status === "pending" ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Price</p>
                        <p className="text-2xl font-bold text-primary">${booking.totalPrice.toLocaleString()}</p>
                      </div>

                      {/* Actions */}
                      {booking.status !== "cancelled" && (
                        <button
                          onClick={() => {
                            if (confirm("Are you sure you want to cancel this booking?")) {
                              cancelBooking(booking.id)
                            }
                          }}
                          className="text-sm text-destructive hover:underline"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No bookings yet</h3>
              <p className="text-muted-foreground mb-6">Start your adventure by booking a destination!</p>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
              >
                Explore Destinations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="mt-12 bg-card border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Full Name</label>
              <p className="text-lg font-semibold text-foreground">{user.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email Address</label>
              <p className="text-lg font-semibold text-foreground">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Member Since</label>
              <p className="text-lg font-semibold text-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <Link
            href="/profile"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
          >
            Edit Profile <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
