"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signup: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage")
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.some((u: User) => u.email === email)) {
      throw new Error("Email already registered")
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password, // Note: In production, never store plain passwords
      name,
      createdAt: new Date().toISOString(),
      preferences: {
        favoriteDestinations: [],
        currency: "USD",
        notifications: true,
      },
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    setUser(newUser)
  }

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u: User) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error("Invalid email or password")
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser))
    setUser(foundUser)
  }

  const logout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
  }

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...updates }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    setUser(updatedUser)

    // Update in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const index = users.findIndex((u: User) => u.id === user.id)
    if (index !== -1) {
      users[index] = updatedUser
      localStorage.setItem("users", JSON.stringify(users))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
