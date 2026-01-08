"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar } from "lucide-react"
import { useImageContext } from "@/lib/image-context"

export default function DestinationCards({ destinations, onSelectDestination }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [imageErrors, setImageErrors] = useState({})
  const { imageUpdates } = useImageContext()

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {destinations.map((destination) => (
        <Card
          key={destination.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer group"
          onMouseEnter={() => setHoveredId(destination.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-muted">
            {!imageErrors[destination.id] ? (
              <img
                src={imageUpdates[destination.id] || destination.image || "/placeholder.svg"}
                alt={destination.title}
                onError={() => handleImageError(destination.id)}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  hoveredId === destination.id ? "scale-105" : "scale-100"
                }`}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Image unavailable</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
              {destination.country}
            </div>
          </div>

          <CardHeader className="pb-2 sm:pb-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{destination.date}</span>
            </div>
            <CardTitle className="text-base sm:text-lg md:text-xl text-foreground line-clamp-2">
              {destination.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 pb-3">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {destination.description}
            </p>
          </CardContent>

          <CardFooter className="pt-0 flex gap-2 flex-col sm:flex-row">
            <Button
              onClick={() => onSelectDestination(destination)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm"
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(destination.googleMapLink, "_blank")}
              className="flex-1 text-xs sm:text-sm"
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Map</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
