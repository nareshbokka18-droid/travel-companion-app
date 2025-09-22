import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Ticket, Navigation, Shield, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-balance">Travel Companion</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Your Journey <span className="text-primary">Starts Here</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8">
            Plan trips, find rides, book tickets, and explore amazing destinations with our all-in-one travel companion
            app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-balance mb-4">Everything You Need to Travel</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From planning to booking, we've got your entire journey covered
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Smart Trip Planning</CardTitle>
              <CardDescription>
                Plan your perfect trip with AI-powered recommendations and real-time location tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Interactive maps with tourist spots</li>
                <li>• Route optimization</li>
                <li>• Real-time location updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Ride Sharing</CardTitle>
              <CardDescription>Connect with fellow travelers and share rides for bikes, cars, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Safe rider verification</li>
                <li>• Cost splitting</li>
                <li>• Real-time tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Ticket className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Easy Booking</CardTitle>
              <CardDescription>Book tickets for buses, trains, and flights all in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Compare prices instantly</li>
                <li>• Secure payment processing</li>
                <li>• Digital ticket storage</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-warning" />
              </div>
              <CardTitle>Safe & Secure</CardTitle>
              <CardDescription>Travel with confidence knowing your data and payments are protected</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• End-to-end encryption</li>
                <li>• Verified user profiles</li>
                <li>• 24/7 support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>Stay informed with live notifications about your trips and bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Trip status alerts</li>
                <li>• Weather updates</li>
                <li>• Traffic notifications</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Navigation className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Multi-Modal Transport</CardTitle>
              <CardDescription>Choose from bikes, cars, trains, buses, and flights for any journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Compare all options</li>
                <li>• Time and cost estimates</li>
                <li>• Seamless transfers</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-balance mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-lg text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust Travel Companion for their journeys
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">
              Start Traveling Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 Travel Companion. Your journey starts here.</p>
        </div>
      </footer>
    </div>
  )
}
