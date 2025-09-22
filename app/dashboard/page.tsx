"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Navigation,
  User,
  MapPin,
  Calendar,
  Search,
  Filter,
  Compass,
  Star,
  Clock,
  DollarSign,
  ArrowLeft,
} from "lucide-react"
import { MapInterface } from "@/components/map-interface"
import { ProfilePanel } from "@/components/profile-panel"
import { TripPlanPanel } from "@/components/trip-plan-panel"
import { NotificationCenter } from "@/components/notification-center"
import { LocationTracker } from "@/components/location-tracker"
import { useRealTime } from "@/components/real-time-provider"
import Link from "next/link"

export default function DashboardPage() {
  const [showProfilePanel, setShowProfilePanel] = useState(false)
  const [showTripPlanPanel, setShowTripPlanPanel] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const { location, isLocationTracking } = useRealTime()

  const [nearbyPlaces, setNearbyPlaces] = useState([
    {
      id: 1,
      name: "Central Park",
      type: "Park",
      distance: "0.5 km",
      rating: 4.8,
      image: "/central-park-autumn.png",
    },
    {
      id: 2,
      name: "Metropolitan Museum",
      type: "Museum",
      distance: "1.2 km",
      rating: 4.9,
      image: "/museum-interior.png",
    },
    {
      id: 3,
      name: "Times Square",
      type: "Landmark",
      distance: "2.1 km",
      rating: 4.6,
      image: "/times-square-bustle.png",
    },
    {
      id: 4,
      name: "Brooklyn Bridge",
      type: "Bridge",
      distance: "3.4 km",
      rating: 4.7,
      image: "/brooklyn-bridge-cityscape.png",
    },
  ])

  useEffect(() => {
    if (location) {
      setUserLocation({
        lat: location.latitude,
        lng: location.longitude,
      })
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied:", error)
          // Set default location (New York City)
          setUserLocation({ lat: 40.7128, lng: -74.006 })
        },
      )
    } else {
      // Set default location if geolocation is not supported
      setUserLocation({ lat: 40.7128, lng: -74.006 })
    }
  }, [location])

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Navigation className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Travel Companion</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProfilePanel(true)}
              className="flex items-center gap-2"
              title="Profile"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Profile</span>
            </Button>

            <NotificationCenter />

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTripPlanPanel(true)}
              className="flex items-center gap-2"
              title="Trip Planning"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Trip Plan</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar - Nearby Places */}
        <div className="w-80 border-r bg-card overflow-y-auto hidden md:block">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Nearby Places</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {nearbyPlaces.map((place) => (
                <Card key={place.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{place.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {place.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{place.distance}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">{place.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <LocationTracker />
            </div>

            {/* Quick Actions */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-1 bg-transparent">
                  <Compass className="w-4 h-4" />
                  <span className="text-xs">Explore</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-1 bg-transparent">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs">Directions</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-1 bg-transparent">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">Schedule</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col gap-1 bg-transparent">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs">Budget</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          <MapInterface userLocation={userLocation} nearbyPlaces={nearbyPlaces} />

          {userLocation && (
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${isLocationTracking ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                />
                <span className="text-sm font-medium">{isLocationTracking ? "Live Tracking" : "Location Active"}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}
              </p>
              {location && <p className="text-xs text-muted-foreground">Accuracy: ±{Math.round(location.accuracy)}m</p>}
            </div>
          )}
        </div>
      </div>

      {/* Profile Panel */}
      <ProfilePanel isOpen={showProfilePanel} onClose={() => setShowProfilePanel(false)} />

      {/* Trip Plan Panel */}
      <TripPlanPanel isOpen={showTripPlanPanel} onClose={() => setShowTripPlanPanel(false)} />
    </div>
  )
}
