"use client"

import { useData } from "@/lib/data-context"
import { PackageCard } from "./package-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FeaturedPackages() {
  const { packages } = useData()
  const featured = packages.slice(0, 3)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Destinations</h2>
          <p className="text-muted-foreground text-lg">Handpicked travel packages for unforgettable experiences</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium"
          >
            View All Destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
