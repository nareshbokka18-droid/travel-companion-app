import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { RealTimeProvider } from "@/components/real-time-provider"

export const metadata: Metadata = {
  title: "Travel Companion - Your Journey Starts Here",
  description: "Plan trips, find rides, book tickets, and explore the world with Travel Companion",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <RealTimeProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Navigation />
        </RealTimeProvider>
        <Analytics />
      </body>
    </html>
  )
}
