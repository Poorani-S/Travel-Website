"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Error boundary caught:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertCircle className="w-16 h-16 text-destructive" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Something Went Wrong</h1>
        <p className="text-lg text-muted-foreground">
          We encountered an unexpected error. Our team has been notified and is working to fix it.
        </p>
        {error.message && (
          <div className="bg-muted p-4 rounded-lg border border-border text-left">
            <p className="text-xs text-muted-foreground font-mono break-words">{error.message}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={reset} className="flex-1 bg-transparent">
            Try Again
          </Button>
          <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
