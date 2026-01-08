"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PackageCard } from "@/components/package-card"
import { useData } from "@/lib/data-context"
import { useState, useMemo } from "react"
import { Search, Filter } from "lucide-react"

export default function DestinationsPage() {
  const { packages } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating" | "newest">("price-low")

  const categories = Array.from(new Set(packages.map((p) => p.category)))

  const filteredPackages = useMemo(() => {
    const result = packages.filter((pkg) => {
      const matchesSearch =
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.country.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || pkg.category === selectedCategory
      const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort
    switch (sortBy) {
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [packages, searchQuery, selectedCategory, priceRange, sortBy])

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Explore Destinations</h1>
          <p className="text-muted-foreground text-lg">Discover {packages.length} amazing travel packages worldwide</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-card border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations, countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Category</label>
              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="200000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                className="w-full"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredPackages.length}</span> results found
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {filteredPackages.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No packages found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
