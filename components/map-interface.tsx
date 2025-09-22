"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Plus, Minus, Crosshair } from "lucide-react"

interface MapInterfaceProps {
  userLocation: { lat: number; lng: number } | null
  nearbyPlaces: Array<{
    id: number
    name: string
    type: string
    distance: string
    rating: number
    image: string
  }>
}

export function MapInterface({ userLocation, nearbyPlaces }: MapInterfaceProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(13)
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 })

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation)
    }
  }, [userLocation])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 18))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 1))
  }

  const handleRecenter = () => {
    if (userLocation) {
      setMapCenter(userLocation)
    }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full relative overflow-hidden">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* User Location Marker */}
          {userLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              <div className="relative">
                <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />
              </div>
            </div>
          )}

          {/* Nearby Places Markers */}
          {nearbyPlaces.map((place, index) => (
            <div
              key={place.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              style={{
                left: `${45 + (index % 3) * 15}%`,
                top: `${35 + Math.floor(index / 3) * 20}%`,
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-accent rounded-full border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <Card className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48">
                  <CardContent className="p-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div>
                        <p className="text-xs font-medium">{place.name}</p>
                        <p className="text-xs text-muted-foreground">{place.distance}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {/* Roads/Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 0,60% Q 25%,40% 50%,50% T 100%,45%"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
            />
            <path
              d="M 20%,0 Q 40%,30% 50%,50% Q 60%,70% 80%,100%"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8,4"
            />
          </svg>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="sm" onClick={handleZoomIn} className="w-10 h-10 p-0 bg-transparent">
          <Plus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleZoomOut} className="w-10 h-10 p-0 bg-transparent">
          <Minus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleRecenter} className="w-10 h-10 p-0 bg-transparent">
          <Crosshair className="w-4 h-4" />
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h4 className="text-sm font-medium mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-xs">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-xs">Tourist Spots</span>
          </div>
        </div>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
        <span className="text-xs text-muted-foreground">Zoom: {zoom}</span>
      </div>
    </div>
  )
}
