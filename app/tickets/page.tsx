"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Plane, Train, Bus, Star, Users, Wifi, Coffee, Zap } from "lucide-react"

interface TicketOption {
  id: string
  operator: string
  departure: string
  arrival: string
  duration: string
  price: number
  rating: number
  amenities: string[]
  seatsAvailable: number
}

const mockBusTickets: TicketOption[] = [
  {
    id: "bus-1",
    operator: "Greyhound Express",
    departure: "08:00 AM",
    arrival: "02:30 PM",
    duration: "6h 30m",
    price: 45,
    rating: 4.2,
    amenities: ["WiFi", "AC", "Reclining Seats"],
    seatsAvailable: 12,
  },
  {
    id: "bus-2",
    operator: "Megabus",
    departure: "11:15 AM",
    arrival: "05:45 PM",
    duration: "6h 30m",
    price: 35,
    rating: 4.0,
    amenities: ["WiFi", "Power Outlets"],
    seatsAvailable: 8,
  },
]

const mockTrainTickets: TicketOption[] = [
  {
    id: "train-1",
    operator: "Amtrak Northeast",
    departure: "07:30 AM",
    arrival: "11:45 AM",
    duration: "4h 15m",
    price: 89,
    rating: 4.5,
    amenities: ["WiFi", "Cafe Car", "Power Outlets"],
    seatsAvailable: 24,
  },
  {
    id: "train-2",
    operator: "Acela Express",
    departure: "09:00 AM",
    arrival: "12:30 PM",
    duration: "3h 30m",
    price: 165,
    rating: 4.8,
    amenities: ["WiFi", "First Class", "Cafe Car", "Power Outlets"],
    seatsAvailable: 6,
  },
]

const mockFlightTickets: TicketOption[] = [
  {
    id: "flight-1",
    operator: "Delta Airlines",
    departure: "06:45 AM",
    arrival: "08:30 AM",
    duration: "1h 45m",
    price: 189,
    rating: 4.3,
    amenities: ["In-flight WiFi", "Snacks", "Entertainment"],
    seatsAvailable: 15,
  },
  {
    id: "flight-2",
    operator: "JetBlue",
    departure: "02:15 PM",
    arrival: "04:00 PM",
    duration: "1h 45m",
    price: 156,
    rating: 4.4,
    amenities: ["Free WiFi", "Snacks", "Extra Legroom"],
    seatsAvailable: 22,
  },
]

export default function TicketsPage() {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
  })
  const [activeTab, setActiveTab] = useState("bus")
  const [searchResults, setSearchResults] = useState<TicketOption[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<TicketOption | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const handleSearch = async () => {
    if (!searchData.from || !searchData.to || !searchData.date) {
      alert("Please fill in all search fields")
      return
    }

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      let results: TicketOption[] = []
      switch (activeTab) {
        case "bus":
          results = mockBusTickets
          break
        case "train":
          results = mockTrainTickets
          break
        case "flight":
          results = mockFlightTickets
          break
      }
      setSearchResults(results)
      setIsSearching(false)
    }, 1500)
  }

  const handleBookTicket = (ticket: TicketOption) => {
    setSelectedTicket(ticket)
    setShowBookingForm(true)
  }

  const getTransportIcon = (type: string) => {
    switch (type) {
      case "bus":
        return <Bus className="h-5 w-5" />
      case "train":
        return <Train className="h-5 w-5" />
      case "flight":
        return <Plane className="h-5 w-5" />
      default:
        return <Bus className="h-5 w-5" />
    }
  }

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes("wifi")) return <Wifi className="h-4 w-4" />
    if (amenity.toLowerCase().includes("cafe") || amenity.toLowerCase().includes("snacks"))
      return <Coffee className="h-4 w-4" />
    if (amenity.toLowerCase().includes("power") || amenity.toLowerCase().includes("outlet"))
      return <Zap className="h-4 w-4" />
    return <Star className="h-4 w-4" />
  }

  if (showBookingForm && selectedTicket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setShowBookingForm(false)} className="mb-4">
              ← Back to Results
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTransportIcon(activeTab)}
                {selectedTicket.operator}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">From: {searchData.from}</p>
                  <p className="font-semibold">{selectedTicket.departure}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">To: {searchData.to}</p>
                  <p className="font-semibold">{selectedTicket.arrival}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Duration: {selectedTicket.duration}</span>
                <span className="text-2xl font-bold text-teal-600">${selectedTicket.price}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Passenger Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="25" />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                className="w-full bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  alert("Booking confirmed! You will receive a confirmation email shortly.")
                  setShowBookingForm(false)
                  setSearchResults([])
                }}
              >
                Confirm Booking - ${selectedTicket.price}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Tickets</h1>
          <p className="text-gray-600">Find and book bus, train, and flight tickets for your journey</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="from">From</Label>
                <Input
                  id="from"
                  placeholder="New York"
                  value={searchData.from}
                  onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  placeholder="Boston"
                  value={searchData.to}
                  onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="passengers">Passengers</Label>
                <Select
                  value={searchData.passengers}
                  onValueChange={(value) => setSearchData({ ...searchData, passengers: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4+ Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bus" className="flex items-center gap-2">
                  <Bus className="h-4 w-4" />
                  Bus
                </TabsTrigger>
                <TabsTrigger value="train" className="flex items-center gap-2">
                  <Train className="h-4 w-4" />
                  Train
                </TabsTrigger>
                <TabsTrigger value="flight" className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  Flight
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button onClick={handleSearch} className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSearching}>
              {isSearching ? "Searching..." : "Search Tickets"}
            </Button>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Available Tickets</h2>
            {searchResults.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getTransportIcon(activeTab)}
                      <div>
                        <h3 className="font-semibold text-lg">{ticket.operator}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{ticket.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-teal-600">${ticket.price}</div>
                      <div className="text-sm text-gray-600">per person</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-semibold">{ticket.departure}</div>
                        <div className="text-sm text-gray-600">Departure</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-semibold">{ticket.duration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-semibold">{ticket.arrival}</div>
                        <div className="text-sm text-gray-600">Arrival</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{ticket.seatsAvailable} seats left</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {ticket.amenities.slice(0, 3).map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {getAmenityIcon(amenity)}
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button onClick={() => handleBookTicket(ticket)} className="bg-orange-500 hover:bg-orange-600">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for the best tickets...</p>
          </div>
        )}
      </div>
    </div>
  )
}
