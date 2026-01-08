"use client"

import Link from "next/link"
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react"

export  function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-12 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-foreground">TravelHub</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover amazing destinations and create unforgettable travel memories.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@travelhub.com"
                  className="text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  info@travelhub.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 1234567890
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            &copy; {currentYear} TravelHub. All rights reserved. |
            <a href="#" className="text-primary hover:text-primary/80 ml-2">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
