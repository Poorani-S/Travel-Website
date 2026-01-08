"use client"

import { MapPin, Menu, X, Settings } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Header({ bookingCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <MapPin className="w-6 h-6 text-primary" />
          <h1 className="text-lg md:text-xl font-bold text-foreground">TravelHub</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Destinations
          </Link>
          <Link
            href="/bookings"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            My Bookings
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/admin/images"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            
          </Link>
        </nav>

        {/* Bookings Badge & Mobile Menu */}
        <div className="flex items-center gap-4">
          {bookingCount > 0 && (
            <Link href="/bookings">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer">
                {bookingCount} Booking{bookingCount !== 1 ? "s" : ""}
              </div>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="flex flex-col gap-3 p-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Destinations
            </Link>
            <Link
              href="/bookings"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              My Bookings
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              About
            </Link>
            <Link
              href="/admin/images"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center gap-1"
            >
             
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
