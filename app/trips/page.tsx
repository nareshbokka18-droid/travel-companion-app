"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Navigation,
  Plus,
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Star,
  ArrowRight,
  Filter,
  Search,
  User,
  ArrowLeft,
} from "lucide-react"
import { TripPlanPanel } from "@/components/trip-plan-panel"

export default function TripsPage() {
  const [showTripPlanPanel, setShowTripPlanPanel] = useState(false)

  const upcomingTrips = [
    {
      id: 1,
      title: "Weekend in Central Park",
      destination: "Central Park, NY",
      date: "Dec 15, 2024",
      duration: "2 days",
      transport: "Bike",
      cost: "$45",
      status: "confirmed",
      image: "/central-park-autumn.png",
      participants: 2,
    },
    {
      id: 2,
      title: "Museum Tour",
      destination: "Metropolitan Museum",
      date: "Dec 20, 2024",
      duration: "4 hours",
      transport: "Train",
      cost: "$28",
      status: "pending",
      image: "/museum-interior.png",
      participants: 1,
    },
  ]

  const pastTrips = [
    {
      id: 3,
      title: "Times Square Experience",
      destination: "Times Square, NY",
      date: "Nov 28, 2024",
      duration: "1 day",
      transport: "Car",
      cost: "$65",
      status: "completed",
      rating: 4.8,
      image: "/times-square-bustle.png",
      participants: 3,
    },
    {
      id: 4,
      title: "Brooklyn Bridge Walk",
      destination: "Brooklyn Bridge",
      date: "Nov 15, 2024",
      duration: "3 hours",
      transport: "Bus",
      cost: "$12",
      status: "completed",
      rating: 4.9,
      image: "/brooklyn-bridge-cityscape.png",
      participants: 2,
    },
  ]

  const savedTrips = [
    {
      id: 5,
      title: "Statue of Liberty Tour",
      destination: "Liberty Island",
      estimatedCost: "$85",
      estimatedDuration: "6 hours",
      transport: "Ferry",
      image: "/statue-liberty-harbor.png",
    },
    {
      id: 6,
      title: "High Line Park Walk",
      destination: "High Line, NY",
      estimatedCost: "$0",
      estimatedDuration: "2 hours",
      transport: "Walking",
      image: "/high-line-park.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Navigation className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Travel Companion</span>
            </div>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">My Trips</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setShowTripPlanPanel(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Trip
            </Button>
            <Link href="/dashboard">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance mb-2">My Trips</h1>
          <p className="text-muted-foreground text-pretty">Manage your travel plans and explore new destinations</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Trips</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          {/* Upcoming Trips */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingTrips.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingTrips.map((trip) => (
                  <Card key={trip.id} className="hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={trip.image || "/placeholder.svg"}
                        alt={trip.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge
                        className="absolute top-3 right-3"
                        variant={trip.status === "confirmed" ? "default" : "secondary"}
                      >
                        {trip.status}
                      </Badge>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{trip.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {trip.destination}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {trip.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {trip.duration}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {trip.participants} {trip.participants === 1 ? "person" : "people"}
                        </div>
                        <div className="flex items-center gap-1 font-medium">
                          <DollarSign className="w-3 h-3" />
                          {trip.cost}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming trips</h3>
                  <p className="text-muted-foreground mb-4">Start planning your next adventure!</p>
                  <Button onClick={() => setShowTripPlanPanel(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Plan New Trip
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Past Trips */}
          <TabsContent value="past" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastTrips.map((trip) => (
                <Card key={trip.id} className="hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{trip.rating}</span>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{trip.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {trip.destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {trip.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {trip.duration}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {trip.participants} {trip.participants === 1 ? "person" : "people"}
                      </div>
                      <div className="flex items-center gap-1 font-medium">
                        <DollarSign className="w-3 h-3" />
                        {trip.cost}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        View Photos
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Book Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Trips */}
          <TabsContent value="saved" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedTrips.map((trip) => (
                <Card key={trip.id} className="hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={trip.image || "/placeholder.svg"}
                      alt={trip.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 right-3" variant="outline">
                      Saved
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{trip.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {trip.destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {trip.estimatedDuration}
                      </div>
                      <div className="flex items-center gap-1 font-medium">
                        <DollarSign className="w-3 h-3" />
                        {trip.estimatedCost}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Transport: {trip.transport}</div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <ArrowRight className="w-3 h-3 mr-1" />
                        Book Now
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Trip Plan Panel */}
      <TripPlanPanel isOpen={showTripPlanPanel} onClose={() => setShowTripPlanPanel(false)} />
    </div>
  )
}
