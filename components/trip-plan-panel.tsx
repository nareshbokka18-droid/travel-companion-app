"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  X,
  MapPin,
  Navigation,
  Car,
  Bike,
  Train,
  Bus,
  Plane,
  Clock,
  DollarSign,
  Users,
  CalendarIcon,
  Plus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TripPlanPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function TripPlanPanel({ isOpen, onClose }: TripPlanPanelProps) {
  const [tripData, setTripData] = useState({
    title: "",
    startLocation: "",
    destination: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    notes: "",
  })
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null)
  const [showRideshareForm, setShowRideshareForm] = useState(false)
  const [riderDetails, setRiderDetails] = useState({
    name: "",
    gender: "",
    age: "",
    contact: "",
  })
  const { toast } = useToast()

  const transportOptions = [
    {
      id: "bike",
      name: "Bike",
      icon: Bike,
      time: "25 min",
      cost: "$0",
      eco: true,
      rideshare: true,
    },
    {
      id: "car",
      name: "Car",
      icon: Car,
      time: "12 min",
      cost: "$8",
      eco: false,
      rideshare: true,
    },
    {
      id: "train",
      name: "Train",
      icon: Train,
      time: "18 min",
      cost: "$4.50",
      eco: true,
      rideshare: false,
    },
    {
      id: "bus",
      name: "Bus",
      icon: Bus,
      time: "22 min",
      cost: "$2.75",
      eco: true,
      rideshare: false,
    },
    {
      id: "flight",
      name: "Flight",
      icon: Plane,
      time: "2h 15m",
      cost: "$180",
      eco: false,
      rideshare: false,
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setTripData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRiderDetailsChange = (field: string, value: string) => {
    setRiderDetails((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlanTrip = () => {
    if (!tripData.startLocation || !tripData.destination || !selectedTransport) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to plan your trip.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Trip Planned Successfully!",
      description: `Your trip to ${tripData.destination} has been added to your upcoming trips.`,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Plan Your Trip</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trip Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Trip Title</Label>
              <Input
                id="title"
                placeholder="Give your trip a name"
                value={tripData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start">Starting Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="start"
                    placeholder="Enter starting point"
                    value={tripData.startLocation}
                    onChange={(e) => handleInputChange("startLocation", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="destination"
                    placeholder="Where are you going?"
                    value={tripData.destination}
                    onChange={(e) => handleInputChange("destination", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tripData.startDate ? format(tripData.startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={tripData.startDate}
                      onSelect={(date) => setTripData((prev) => ({ ...prev, startDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tripData.endDate ? format(tripData.endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={tripData.endDate}
                      onSelect={(date) => setTripData((prev) => ({ ...prev, endDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special notes or requirements for your trip"
                value={tripData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* Transport Options */}
          <div>
            <h4 className="font-medium mb-4">Choose Transport</h4>
            <div className="space-y-3">
              {transportOptions.map((option) => {
                const Icon = option.icon
                const isSelected = selectedTransport === option.id
                return (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTransport(option.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{option.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {option.eco && <Badge variant="secondary">Eco</Badge>}
                              {option.rideshare && <Badge variant="outline">Rideshare</Badge>}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-3 h-3" />
                            {option.time}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <DollarSign className="w-3 h-3" />
                            {option.cost}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Rideshare Options */}
          {selectedTransport && transportOptions.find((t) => t.id === selectedTransport)?.rideshare && (
            <>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <h4 className="font-medium">Rideshare Available</h4>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRideshareForm(!showRideshareForm)}
                    className="bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {showRideshareForm ? "Cancel" : "Add Rider"}
                  </Button>
                </div>

                {showRideshareForm ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Rider Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="riderName">Name</Label>
                          <Input
                            id="riderName"
                            placeholder="Rider's name"
                            value={riderDetails.name}
                            onChange={(e) => handleRiderDetailsChange("name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="riderGender">Gender</Label>
                          <Input
                            id="riderGender"
                            placeholder="Gender"
                            value={riderDetails.gender}
                            onChange={(e) => handleRiderDetailsChange("gender", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="riderAge">Age</Label>
                          <Input
                            id="riderAge"
                            placeholder="Age"
                            value={riderDetails.age}
                            onChange={(e) => handleRiderDetailsChange("age", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="riderContact">Contact Info</Label>
                          <Input
                            id="riderContact"
                            placeholder="Phone or email"
                            value={riderDetails.contact}
                            onChange={(e) => handleRiderDetailsChange("contact", e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        Share your ride and split the cost with other travelers
                      </p>
                      <Button variant="outline" size="sm" onClick={() => setShowRideshareForm(true)}>
                        Find Riders
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handlePlanTrip}>
              Plan Trip
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
