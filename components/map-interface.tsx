"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Plus, Minus, Crosshair, Navigation2, Wifi } from "lucide-react"

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
  const [isTracking, setIsTracking] = useState(true)
  const [signalStrength, setSignalStrength] = useState(4)

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation)
    }
  }, [userLocation])

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(Math.floor(Math.random() * 5) + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-emerald-50 to-sky-100">
          {/* Street Grid Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(100,116,139,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100,116,139,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/3 w-32 h-20 bg-green-200/40 rounded-full blur-sm" />
            <div className="absolute bottom-1/3 right-1/4 w-24 h-16 bg-blue-200/40 rounded-full blur-sm" />
            <div className="absolute top-1/2 right-1/3 w-20 h-12 bg-yellow-200/30 rounded-full blur-sm" />
          </div>

          {/* User Location Marker */}
          {userLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                  <Navigation2 className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -inset-3 bg-blue-500/20 rounded-full animate-ping" />
                <div className="absolute -inset-6 bg-blue-500/10 rounded-full animate-ping animation-delay-1000" />
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
                <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <Card className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-30">
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

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 0,60% Q 25%,40% 50%,50% T 100%,45%"
              stroke="rgba(71,85,105,0.4)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="15,8"
            />
            <path
              d="M 20%,0 Q 40%,30% 50%,50% Q 60%,70% 80%,100%"
              stroke="rgba(71,85,105,0.3)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="12,6"
            />
            <path
              d="M 0,30% Q 30%,35% 60%,40% Q 80%,42% 100%,38%"
              stroke="rgba(71,85,105,0.2)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10,5"
            />
          </svg>
        </div>
      </div>

      {userLocation && (
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md rounded-xl p-4 shadow-xl border">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${isTracking ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
              {isTracking && <div className="absolute -inset-1 bg-green-500/30 rounded-full animate-ping" />}
            </div>
            <span className="text-sm font-semibold text-foreground">
              {isTracking ? "Live GPS Tracking" : "Location Services Off"}
            </span>
          </div>

          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Coordinates:</span>
              <span className="font-mono">
                {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Accuracy:</span>
              <span>±{Math.floor(Math.random() * 10) + 3}m</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Signal:</span>
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <div
                      key={bar}
                      className={`w-1 h-2 rounded-sm ${bar <= signalStrength ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Update:</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          className="w-10 h-10 p-0 bg-background/90 backdrop-blur-sm"
        >
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          className="w-10 h-10 p-0 bg-background/90 backdrop-blur-sm"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRecenter}
          className="w-10 h-10 p-0 bg-background/90 backdrop-blur-sm"
        >
          <Crosshair className="w-4 h-4" />
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-md rounded-xl p-3 shadow-xl border">
        <h4 className="text-sm font-medium mb-2">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <Navigation2 className="w-2 h-2 text-white" />
            </div>
            <span className="text-xs">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
              <MapPin className="w-2 h-2 text-white" />
            </div>
            <span className="text-xs">Tourist Spots</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-slate-500 rounded opacity-60" />
            <span className="text-xs">Roads & Paths</span>
          </div>
        </div>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-md rounded-lg px-3 py-2 shadow-xl border">
        <span className="text-xs font-medium text-muted-foreground">Zoom Level: {zoom}</span>
      </div>
    </div>
  )
}
