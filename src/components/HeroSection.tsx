import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="relative z-10 space-y-8">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Web3 Community in Uganda
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Connect, Learn & Build in the Web3 Space
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Join the leading Web3 community in Uganda. Discover upcoming blockchain events, connect with like-minded
                individuals, and stay updated on the latest Web3 trends.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/events"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/community"
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-5 py-3 text-base font-medium transition-colors hover:bg-muted"
              >
                Join Community
              </Link>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full bg-muted ring-2 ring-background" />
                ))}
              </div>
              <span>Join 500+ members already in our community</span>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Upcoming Featured Event</h3>
              <div className="space-y-4">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Featured Event"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">July 15, 2023 • 2:00 PM</span>
                    <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      DeFi
                    </span>
                  </div>
                  <h4 className="text-lg font-bold">Web3 DeFi Summit Kampala</h4>
                  <p className="text-sm text-muted-foreground mt-2 mb-4">
                    Join us for a day of learning and networking focused on decentralized finance and its applications
                    in the Ugandan context.
                  </p>
                  <Link to="/events/1" className="inline-flex items-center text-primary hover:underline">
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

