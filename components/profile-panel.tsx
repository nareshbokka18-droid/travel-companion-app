"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, User, Phone, HelpCircle, LogOut, Star, MapPin, Edit2, Save, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProfilePanelProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfilePanel({ isOpen, onClose }: ProfilePanelProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "John Traveler",
    phone: "+1 (555) 123-4567",
  })
  const [editData, setEditData] = useState(userData)
  const [notifications, setNotifications] = useState({
    weather: true,
    hotels: true,
    restaurants: false,
    alerts: true,
  })
  const [settings, setSettings] = useState({
    language: "english",
    units: "metric",
  })
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = localStorage.getItem("travelUser")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData(user)
      setEditData(user)
    }
  }, [])

  const handleSaveProfile = () => {
    setUserData(editData)
    localStorage.setItem("travelUser", JSON.stringify(editData))
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Profile</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">Travel Enthusiast</p>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1" />
                4.9 Rating
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </Button>
            <Button
              variant={activeTab === "notifications" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </Button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="editName">Name</Label>
                    <Input
                      id="editName"
                      value={editData.name}
                      onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editPhone">Phone Number</Label>
                    <Input
                      id="editPhone"
                      value={editData.phone}
                      onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{userData.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">New York, NY</span>
                  </div>
                </div>
              )}

              <Separator />

              {/* Travel Stats */}
              <div>
                <h4 className="font-medium mb-3">Travel Stats</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">24</p>
                    <p className="text-xs text-muted-foreground">Trips</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">12</p>
                    <p className="text-xs text-muted-foreground">Countries</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">156</p>
                    <p className="text-xs text-muted-foreground">Places</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              <h4 className="font-medium">Notification Preferences</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Weather Updates</p>
                    <p className="text-xs text-muted-foreground">Get weather alerts for your destinations</p>
                  </div>
                  <Switch
                    checked={notifications.weather}
                    onCheckedChange={(checked) => handleNotificationChange("weather", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Nearby Hotels & Restaurants</p>
                    <p className="text-xs text-muted-foreground">Discover places near your location</p>
                  </div>
                  <Switch
                    checked={notifications.hotels}
                    onCheckedChange={(checked) => handleNotificationChange("hotels", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Restaurant Recommendations</p>
                    <p className="text-xs text-muted-foreground">Get dining suggestions</p>
                  </div>
                  <Switch
                    checked={notifications.restaurants}
                    onCheckedChange={(checked) => handleNotificationChange("restaurants", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Travel Alerts</p>
                    <p className="text-xs text-muted-foreground">Important travel updates and alerts</p>
                  </div>
                  <Switch
                    checked={notifications.alerts}
                    onCheckedChange={(checked) => handleNotificationChange("alerts", checked)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <h4 className="font-medium">App Settings</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Units</Label>
                  <Select
                    value={settings.units}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, units: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (km, °C)</SelectItem>
                      <SelectItem value="imperial">Imperial (mi, °F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <HelpCircle className="w-4 h-4 mr-3" />
                  Help & Support
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Globe className="w-4 h-4 mr-3" />
                  About Travel Companion
                </Button>
              </div>
            </div>
          )}

          <Separator />

          <Button variant="outline" className="w-full bg-transparent" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
