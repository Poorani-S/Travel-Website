"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { FeaturedPackages } from "@/components/featured-packages"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      <FeaturedPackages />
      <Footer />
    </main>
  )
}
