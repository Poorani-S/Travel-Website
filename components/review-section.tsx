"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useData } from "@/lib/data-context"
import { useState } from "react"
import { Star } from "lucide-react"

interface ReviewSectionProps {
  packageId: string
}

export function ReviewSection({ packageId }: ReviewSectionProps) {
  const { user } = useAuth()
  const { reviews, addReview } = useData()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const packageReviews = reviews.filter((r) => r.packageId === packageId)

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("Please login to leave a review")
      return
    }

    setIsSubmitting(true)

    const review = {
      id: Math.random().toString(36).substr(2, 9),
      packageId,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    }

    addReview(review)
    setRating(5)
    setComment("")
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Reviews</h2>

        {/* Review Form */}
        <form onSubmit={handleSubmitReview} className="bg-muted p-6 rounded-xl mb-8">
          <h3 className="font-semibold text-foreground mb-4">Leave a Review</h3>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} type="button" onClick={() => setRating(num)} className="p-1 transition">
                  <Star className={`w-6 h-6 ${num <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !user}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Post Review"}
          </button>
        </form>

        {/* Reviews List */}
        <div className="space-y-4">
          {packageReviews.length > 0 ? (
            packageReviews.map((review) => (
              <div key={review.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{review.userName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  )
}
