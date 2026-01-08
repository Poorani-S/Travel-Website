"use client"

import { useState } from "react"
import { destinations } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useImageContext } from "@/lib/image-context"
import Link from "next/link"
import { ArrowLeft, Trash2, Copy } from "lucide-react"

export default function AdminImagesPage() {
  const { imageUpdates, updateImage, saveImages, resetImages, isSaved } = useImageContext()
  const [copyFeedback, setCopyFeedback] = useState<number | null>(null)

  const handleCopyUrl = (url: string, id: number) => {
    navigator.clipboard.writeText(url)
    setCopyFeedback(id)
    setTimeout(() => setCopyFeedback(null), 2000)
  }

  const handleResetAll = () => {
    if (confirm("Reset all images to defaults? This cannot be undone.")) {
      resetImages()
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Manage Images</h1>
            <p className="text-muted-foreground mt-2">Change destination images in real-time</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <Button onClick={saveImages} disabled={isSaved} className="bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
          <Button
            onClick={handleResetAll}
            variant="outline"
            className="text-destructive hover:text-destructive bg-transparent"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Reset All
          </Button>
          {isSaved && <span className="text-green-600 flex items-center text-sm font-medium">✓ All changes saved</span>}
        </div>

        {/* Images Grid */}
        <div className="grid gap-6">
          {destinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span>{destination.title}</span>
                  <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded">
                    {destination.country}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Current Image Preview */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Image Preview</label>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border bg-muted">
                    <img
                      src={imageUpdates[destination.id] || destination.image || "/placeholder.svg"}
                      alt={destination.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                  <label htmlFor={`url-${destination.id}`} className="block text-sm font-medium text-foreground">
                    Image URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id={`url-${destination.id}`}
                      type="url"
                      placeholder="C:\Users\Admin\Downloads\travel-journal-app (3)\public\ladakh.jpg"
                      value={imageUpdates[destination.id] || destination.image || ""}
                      onChange={(e) => updateImage(destination.id, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={() =>
                        handleCopyUrl(imageUpdates[destination.id] || destination.image || "", destination.id)
                      }
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  {copyFeedback === destination.id && <p className="text-xs text-green-600">Copied to clipboard!</p>}
                </div>

                {/* Current Image Info */}
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Default:</span> {destination.image}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-foreground">How to Update Images</h2>
          <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
            <li>Paste an image URL in the input field above</li>
            <li>Preview updates in real-time above the input</li>
            <li>Click "Save Changes" to save to your browser</li>
            <li>Changes appear instantly on the home page</li>
            <li>
              <strong className="text-foreground">Tip:</strong> Use free image services like Unsplash, Pexels, or
              Pixabay
            </li>
          </ol>

          <div className="mt-4 p-3 bg-primary/10 rounded border border-primary/20">
            <p className="text-xs text-foreground">
              <strong>Production:</strong> To persist images permanently, connect to Vercel Blob, AWS S3, or a database.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
