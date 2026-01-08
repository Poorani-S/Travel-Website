"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface ImageUpdates {
  [key: number]: string
}

interface ImageContextType {
  imageUpdates: ImageUpdates
  updateImage: (id: number, url: string) => void
  saveImages: () => void
  resetImages: () => void
  isSaved: boolean
}

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export function ImageProvider({ children }: { children: ReactNode }) {
  const [imageUpdates, setImageUpdates] = useState<ImageUpdates>({})
  const [isSaved, setIsSaved] = useState(true)

  // Load saved images from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("destination-image-updates")
    if (saved) {
      try {
        setImageUpdates(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load saved images:", e)
      }
    }
  }, [])

  const updateImage = (id: number, url: string) => {
    setImageUpdates((prev) => ({ ...prev, [id]: url }))
    setIsSaved(false)
  }

  const saveImages = () => {
    localStorage.setItem("destination-image-updates", JSON.stringify(imageUpdates))
    setIsSaved(true)
  }

  const resetImages = () => {
    localStorage.removeItem("destination-image-updates")
    setImageUpdates({})
    setIsSaved(true)
  }

  return (
    <ImageContext.Provider value={{ imageUpdates, updateImage, saveImages, resetImages, isSaved }}>
      {children}
    </ImageContext.Provider>
  )
}

export function useImageContext() {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error("useImageContext must be used within ImageProvider")
  }
  return context
}
