"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { X, MapPin, Navigation, CalendarIcon, Car, Bike, Users, DollarSign, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface RideShareModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RideShareModal({ isOpen, onClose }: RideShareModalProps) {
  const [rideData, setRideData] = useState({
    from: "",
    to: "",
    date: undefined as Date | undefined,
    time: "",
    vehicle: "",
    seats: "",
    price: "",
    notes: "",
  })
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setRideData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!rideData.from || !rideData.to || !rideData.date || !rideData.time || !rideData.vehicle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to offer your ride.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Ride Offered Successfully!",
      description: "Your ride has been posted and other travelers can now book it.",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Offer a Ride</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Route Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="from"
                  placeholder="Starting location"
                  value={rideData.from}
                  onChange={(e) => handleInputChange("from", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="to"
                  placeholder="Destination"
                  value={rideData.to}
                  onChange={(e) => handleInputChange("to", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {rideData.date ? format(rideData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={rideData.date}
                    onSelect={(date) => setRideData((prev) => ({ ...prev, date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={rideData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Vehicle and Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vehicle Type</Label>
              <Select value={rideData.vehicle} onValueChange={(value) => handleInputChange("vehicle", value)}>
                <SelectTrigger className="bg-transparent">
                  <SelectValue placeholder="Select vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      Car
                    </div>
                  </SelectItem>
                  <SelectItem value="bike">
                    <div className="flex items-center gap-2">
                      <Bike className="w-4 h-4" />
                      Bike
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seats">Available Seats</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="seats"
                  type="number"
                  min="1"
                  max="8"
                  placeholder="Number of seats"
                  value={rideData.seats}
                  onChange={(e) => handleInputChange("seats", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-2">
            <Label htmlFor="price">Price per Person</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="price"
                type="number"
                min="0"
                step="0.50"
                placeholder="0.00"
                value={rideData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">Set to $0 for free rides</p>
          </div>

          <Separator />

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements, pickup instructions, or other details..."
              value={rideData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSubmit}>
              Offer Ride
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
