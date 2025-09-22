"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Navigation,
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Star,
  Car,
  MessageCircle,
  Phone,
  User,
  Calendar,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { RideShareModal } from "@/components/rideshare-modal"

export default function RidesharePage() {
  const [showRideShareModal, setShowRideShareModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const availableRides = [
    {
      id: 1,
      driver: {
        name: "Sarah Johnson",
        rating: 4.9,
        avatar: "/diverse-user-avatars.png",
        verified: true,
      },
      from: "Central Park",
      to: "Times Square",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      vehicle: "Car",
      seats: 3,
      price: "$8",
      duration: "15 min",
      distance: "2.1 km",
    },
    {
      id: 2,
      driver: {
        name: "Mike Chen",
        rating: 4.8,
        avatar: "/diverse-user-avatars.png",
        verified: true,
      },
      from: "Brooklyn Bridge",
      to: "Metropolitan Museum",
      date: "Dec 16, 2024",
      time: "10:30 AM",
      vehicle: "Bike",
      seats: 1,
      price: "$0",
      duration: "25 min",
      distance: "3.4 km",
    },
    {
      id: 3,
      driver: {
        name: "Emma Davis",
        rating: 4.7,
        avatar: "/diverse-user-avatars.png",
        verified: false,
      },
      from: "High Line Park",
      to: "Statue of Liberty",
      date: "Dec 17, 2024",
      time: "9:00 AM",
      vehicle: "Car",
      seats: 2,
      price: "$12",
      duration: "35 min",
      distance: "8.2 km",
    },
  ]

  const myRides = [
    {
      id: 4,
      type: "offering",
      from: "Central Park",
      to: "Brooklyn Bridge",
      date: "Dec 18, 2024",
      time: "3:00 PM",
      vehicle: "Car",
      seats: 2,
      price: "$10",
      riders: [
        { name: "Alex Kim", avatar: "/diverse-user-avatars.png" },
        { name: "Lisa Wang", avatar: "/diverse-user-avatars.png" },
      ],
      status: "confirmed",
    },
    {
      id: 5,
      type: "requested",
      from: "Times Square",
      to: "High Line Park",
      date: "Dec 20, 2024",
      time: "11:00 AM",
      vehicle: "Bike",
      seats: 1,
      price: "$0",
      driver: { name: "Tom Wilson", avatar: "/diverse-user-avatars.png", rating: 4.9 },
      status: "pending",
    },
  ]

  const rideHistory = [
    {
      id: 6,
      type: "completed",
      from: "Metropolitan Museum",
      to: "Central Park",
      date: "Nov 28, 2024",
      driver: { name: "Sarah Johnson", avatar: "/diverse-user-avatars.png", rating: 4.9 },
      price: "$6",
      rating: 5,
    },
    {
      id: 7,
      type: "completed",
      from: "Brooklyn Bridge",
      to: "Times Square",
      date: "Nov 25, 2024",
      driver: { name: "Mike Chen", avatar: "/diverse-user-avatars.png", rating: 4.8 },
      price: "$8",
      rating: 4,
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
            <span className="font-medium">Rideshare</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search rides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setShowRideShareModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Offer Ride
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
          <h1 className="text-3xl font-bold text-balance mb-2">Rideshare</h1>
          <p className="text-muted-foreground text-pretty">Share rides, save money, and meet fellow travelers</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="available">Available Rides</TabsTrigger>
            <TabsTrigger value="my-rides">My Rides</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Available Rides */}
          <TabsContent value="available" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {availableRides.map((ride) => (
                <Card key={ride.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            <User className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{ride.driver.name}</h3>
                            {ride.driver.verified && <Badge variant="secondary">Verified</Badge>}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground">{ride.driver.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-lg font-bold text-primary">
                          <DollarSign className="w-4 h-4" />
                          {ride.price.replace("$", "")}
                        </div>
                        <div className="text-xs text-muted-foreground">per person</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Route */}
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <div className="w-px h-6 bg-border" />
                        <div className="w-3 h-3 bg-accent rounded-full" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="text-sm font-medium">{ride.from}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-accent" />
                          <span className="text-sm font-medium">{ride.to}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{ride.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>{ride.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="w-3 h-3" />
                        <span>{ride.vehicle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        <span>{ride.seats} seats</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {ride.duration} • {ride.distance}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <ArrowRight className="w-3 h-3 mr-1" />
                        Book Ride
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Rides */}
          <TabsContent value="my-rides" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {myRides.map((ride) => (
                <Card key={ride.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {ride.type === "offering" ? "Offering Ride" : "Requested Ride"}
                          </h3>
                          <Badge variant={ride.status === "confirmed" ? "default" : "secondary"}>{ride.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {ride.date} at {ride.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-lg font-bold text-primary">
                          <DollarSign className="w-4 h-4" />
                          {ride.price.replace("$", "")}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Route */}
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <div className="w-px h-6 bg-border" />
                        <div className="w-3 h-3 bg-accent rounded-full" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="text-sm font-medium">{ride.from}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-accent" />
                          <span className="text-sm font-medium">{ride.to}</span>
                        </div>
                      </div>
                    </div>

                    {/* Participants */}
                    {ride.type === "offering" && ride.riders && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Riders</Label>
                        <div className="flex items-center gap-2 mt-1">
                          {ride.riders.map((rider, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={rider.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  <User className="w-3 h-3" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{rider.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {ride.type === "requested" && ride.driver && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Driver</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              <User className="w-3 h-3" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{ride.driver.name}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{ride.driver.rating}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {rideHistory.map((ride) => (
                <Card key={ride.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Completed Ride</h3>
                        <p className="text-sm text-muted-foreground">{ride.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-lg font-bold">
                          <DollarSign className="w-4 h-4" />
                          {ride.price.replace("$", "")}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < ride.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Route */}
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <div className="w-px h-6 bg-border" />
                        <div className="w-3 h-3 bg-accent rounded-full" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="text-sm font-medium">{ride.from}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-accent" />
                          <span className="text-sm font-medium">{ride.to}</span>
                        </div>
                      </div>
                    </div>

                    {/* Driver */}
                    <div>
                      <Label className="text-xs text-muted-foreground">Driver</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={ride.driver.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            <User className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{ride.driver.name}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{ride.driver.rating}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Book Again
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Leave Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ride Share Modal */}
      <RideShareModal isOpen={showRideShareModal} onClose={() => setShowRideShareModal(false)} />
    </div>
  )
}
