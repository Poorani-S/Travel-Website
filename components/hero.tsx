"use client"

import Link from "next/link"
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[500px] bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Discover Your Next Adventure
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore amazing destinations around the world with TravelHub. Book your perfect trip with our curated
              packages and expert local guides.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/destinations"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
              >
                Explore Destinations <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition font-medium"
              >
                Learn More
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">500+</div>
                <p className="text-sm text-muted-foreground">Destinations</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-secondary">50K+</div>
                <p className="text-sm text-muted-foreground">Happy Travelers</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-primary-foreground space-y-6">
              <h2 className="text-2xl font-bold">Plan Your Trip</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Choose your destination</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span>Select your dates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <span>Invite your friends</span>
                </div>
              </div>
              <button className="w-full bg-white text-primary font-bold py-2 rounded-lg hover:bg-gray-100 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
