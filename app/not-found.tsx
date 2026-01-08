import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center mb-4">
          <MapPin className="w-16 h-16 text-primary opacity-50" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Destination Not Found</h2>
        <p className="text-lg text-muted-foreground">
          Sorry, the page you're looking for seems to have wandered off on its own adventure.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
