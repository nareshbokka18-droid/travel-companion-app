"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock } from "lucide-react"
import { useRealTime } from "./real-time-provider"
import { formatDistanceToNow } from "date-fns"

export function LocationTracker() {
  const { location, isLocationTracking, startLocationTracking, stopLocationTracking } = useRealTime()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={isLocationTracking ? "default" : "secondary"}>
            {isLocationTracking ? "Active" : "Inactive"}
          </Badge>
        </div>

        {location && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-gray-400" />
              <span className="text-sm">
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                Updated {formatDistanceToNow(location.timestamp, { addSuffix: true })}
              </span>
            </div>
            <div className="text-xs text-gray-500">Accuracy: ±{Math.round(location.accuracy)}m</div>
          </div>
        )}

        <Button
          onClick={isLocationTracking ? stopLocationTracking : startLocationTracking}
          variant={isLocationTracking ? "destructive" : "default"}
          className="w-full"
        >
          {isLocationTracking ? "Stop Tracking" : "Start Tracking"}
        </Button>

        {!location && !isLocationTracking && (
          <p className="text-sm text-gray-600">
            Enable location tracking to get real-time updates and better trip recommendations.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
