"use client"

import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, LogOut, User, Compass } from "lucide-react"

export function Navbar() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/80 transition"
          >
            <Compass className="w-6 h-6" />
            <span className="hidden sm:inline">TravelHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/destinations" className="text-foreground hover:text-primary transition">
              Destinations
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-foreground hover:text-primary transition">
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout()
                  }}
                  className="text-foreground hover:text-destructive transition flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="px-4 py-2 text-foreground hover:text-primary transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border">
            <Link href="/destinations" className="block px-4 py-2 text-foreground hover:bg-muted rounded transition">
              Destinations
            </Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:bg-muted rounded transition">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-foreground hover:bg-muted rounded transition">
              Contact
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="block px-4 py-2 text-foreground hover:bg-muted rounded transition">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-destructive hover:bg-muted rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-4 py-2 text-foreground hover:bg-muted rounded transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 bg-primary text-primary-foreground rounded transition text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
