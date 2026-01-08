/**
 * Generate a dynamic image URL using Vercel Blob or placeholder service
 * Can be easily updated to use real image URLs or Blob URLs
 */
export function getDestinationImage(destination: {
  id: number
  country: string
  title: string
  image?: string
}): string {
  // If image URL is provided in data, use it
  if (destination.image) {
    return destination.image
  }

  // Fallback to placeholder
  return `/placeholder.jpg?height=224&width=400&query=${encodeURIComponent(
    `${destination.country} ${destination.title}`,
  )}`
}

/**
 * Update destination image URL
 * This can be called to dynamically change images
 */
export function updateDestinationImage(destination: any, imageUrl: string): typeof destination {
  return {
    ...destination,
    image: imageUrl,
  }
}

/**
 * Batch update multiple destination images
 * Useful for admin panels or API updates
 */
export function batchUpdateImages(destinations: any[], imageMap: Record<number, string>) {
  return destinations.map((dest) => ({
    ...dest,
    image: imageMap[dest.id] || dest.image,
  }))
}
