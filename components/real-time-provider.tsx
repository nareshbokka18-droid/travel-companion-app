"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { toast } from "@/hooks/use-toast"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

interface NotificationData {
  id: string
  title: string
  message: string
  type: "trip" | "ride" | "ticket" | "general"
  timestamp: number
  read: boolean
}

interface RealTimeContextType {
  location: LocationData | null
  notifications: NotificationData[]
  isLocationTracking: boolean
  startLocationTracking: () => void
  stopLocationTracking: () => void
  addNotification: (notification: Omit<NotificationData, "id" | "timestamp" | "read">) => void
  markNotificationRead: (id: string) => void
  clearAllNotifications: () => void
}

const RealTimeContext = createContext<RealTimeContextType | undefined>(undefined)

export function useRealTime() {
  const context = useContext(RealTimeContext)
  if (!context) {
    throw new Error("useRealTime must be used within a RealTimeProvider")
  }
  return context
}

export function RealTimeProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [isLocationTracking, setIsLocationTracking] = useState(false)
  const [watchId, setWatchId] = useState<number | null>(null)

  // Mock notifications for demo
  useEffect(() => {
    const mockNotifications: NotificationData[] = [
      {
        id: "1",
        title: "Trip Reminder",
        message: "Your trip to Boston starts in 2 hours",
        type: "trip",
        timestamp: Date.now() - 3600000,
        read: false,
      },
      {
        id: "2",
        title: "Ride Match Found",
        message: "Sarah is offering a ride to your destination",
        type: "ride",
        timestamp: Date.now() - 1800000,
        read: false,
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location tracking",
        variant: "destructive",
      })
      return
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    }

    const successCallback = (position: GeolocationPosition) => {
      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      }
      setLocation(locationData)

      // Store in localStorage for persistence
      localStorage.setItem("lastKnownLocation", JSON.stringify(locationData))
    }

    const errorCallback = (error: GeolocationPositionError) => {
      console.error("Location error:", error)
      toast({
        title: "Location Error",
        description: "Unable to get your current location",
        variant: "destructive",
      })
    }

    // Start watching position
    const id = navigator.geolocation.watchPosition(successCallback, errorCallback, options)

    setWatchId(id)
    setIsLocationTracking(true)

    toast({
      title: "Location Tracking Started",
      description: "We're now tracking your location for better trip planning",
    })
  }

  const stopLocationTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }
    setIsLocationTracking(false)

    toast({
      title: "Location Tracking Stopped",
      description: "Location tracking has been disabled",
    })
  }

  const addNotification = (notification: Omit<NotificationData, "id" | "timestamp" | "read">) => {
    const newNotification: NotificationData = {
      ...notification,
      id: Date.now().toString(),
      timestamp: Date.now(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast notification
    toast({
      title: notification.title,
      description: notification.message,
    })
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Load last known location on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("lastKnownLocation")
    if (savedLocation) {
      try {
        const locationData = JSON.parse(savedLocation)
        setLocation(locationData)
      } catch (error) {
        console.error("Error parsing saved location:", error)
      }
    }
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random trip updates
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const updates = [
          { title: "Traffic Update", message: "Light traffic on your route to downtown", type: "trip" as const },
          { title: "Weather Alert", message: "Rain expected in 30 minutes", type: "general" as const },
          { title: "Ride Update", message: "Your driver is 5 minutes away", type: "ride" as const },
          { title: "Ticket Reminder", message: "Check-in opens in 1 hour", type: "ticket" as const },
        ]

        const randomUpdate = updates[Math.floor(Math.random() * updates.length)]
        addNotification(randomUpdate)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const value: RealTimeContextType = {
    location,
    notifications,
    isLocationTracking,
    startLocationTracking,
    stopLocationTracking,
    addNotification,
    markNotificationRead,
    clearAllNotifications,
  }

  return <RealTimeContext.Provider value={value}>{children}</RealTimeContext.Provider>
}
