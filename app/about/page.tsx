import Header from "@/components/header"
import {Footer} from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Sparkles, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About TravelHub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in discovering and booking unforgettable travel experiences around the world
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Mission Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              TravelHub is dedicated to making travel planning simple, accessible, and exciting. We believe that
              everyone deserves to explore the world and create lifelong memories. Our platform connects travelers with
              amazing destinations and seamless booking experiences.
            </p>
          </section>

          {/* Features Grid */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Globe className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Global Destinations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Curated travel experiences from beaches to mountains, cities to countryside.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Easy Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Simple, intuitive booking process with just a few clicks to secure your adventure.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>24/7 Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our dedicated team is always ready to help with any questions or concerns.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All destinations are carefully selected to ensure quality and unforgettable experiences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-muted p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Get In Touch</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>
                Email: <span className="text-foreground font-medium">info@travelhub.com</span>
              </p>
              <p>
                Phone: <span className="text-foreground font-medium">+91 1234567890</span>
              </p>
              <p>Hours: Monday - Friday, 9:00 AM - 6:00 PM IST</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
