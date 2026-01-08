import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Spinner className="w-12 h-12 mx-auto" />
        <p className="text-lg text-muted-foreground">Loading your adventure...</p>
      </div>
    </div>
  )
}
