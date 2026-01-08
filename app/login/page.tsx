"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground">Login to your TravelHub account</p>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>

            {/* Demo Credentials */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3 font-semibold">Demo Credentials:</p>
              <div className="space-y-2 text-xs bg-muted p-3 rounded text-muted-foreground">
                <p>Email: demo@travel.com</p>
                <p>Password: demo123</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail("demo@travel.com")
                  setPassword("demo123")
                }}
                className="mt-3 w-full text-xs text-primary hover:underline"
              >
                Use Demo Credentials
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
