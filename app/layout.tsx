import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { DataProvider } from "@/lib/data-context"
import { ImageProvider } from "@/lib/image-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TravelHub - Book Your Next Adventure",
  description:
    "Discover and book amazing travel destinations around the world. Explore beaches, mountains, cities, and more with easy booking and 24/7 support.",
  keywords: ["travel", "destinations", "booking", "adventure", "tourism", "vacation", "trips", "travel agency"],
  authors: [
    {
      name: "TravelHub",
      url: "https://travelhub.com",
    },
  ],
  creator: "TravelHub",
  publisher: "TravelHub",
  robots: "index, follow",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://travelhub.com",
    siteName: "TravelHub",
    title: "TravelHub - Book Your Next Adventure",
    description: "Discover and book amazing travel destinations around the world with TravelHub.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TravelHub - Discover Amazing Destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelHub - Book Your Next Adventure",
    description: "Discover and book amazing travel destinations around the world",
    images: ["/og-image.jpg"],
  },
  
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://travelhub.com" />
      </head>
      <body className={`${_geist.className} antialiased`}>
        <AuthProvider>
          <DataProvider>
            <ImageProvider>
              {children}
              <Analytics />
            </ImageProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
