"use client"

import { useEffect } from "react"
import HeroSection from "../components/HeroSection"
import FeaturedEvents from "../components/FeaturedEvents"
import CommunityHighlights from "../components/CommunityHighlights"
import { useEvents } from "../context/EventsContext"

export default function HomePage() {
  const { events, fetchEvents, isLoading } = useEvents()

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return (
    <div>
      <HeroSection />

      {!isLoading && events.length > 0 && <FeaturedEvents events={events} />}

      <CommunityHighlights />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About Web3 Events UG</h2>
              <p className="text-muted-foreground mb-6">
                Web3 Events UG is a community-driven platform dedicated to fostering the growth of Web3 technologies in
                Uganda. We bring together blockchain enthusiasts, developers, entrepreneurs, and curious minds to learn,
                connect, and build the future of the decentralized web.
              </p>
              <p className="text-muted-foreground mb-6">
                Our mission is to accelerate Web3 adoption in Uganda by providing educational resources, hosting events,
                and creating networking opportunities for everyone interested in blockchain technology and its
                applications.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Events Hosted</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Community Members</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Partners</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Years Active</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Web3 Events UG Community"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -z-10 -bottom-6 -right-6 h-full w-full rounded-xl border border-border bg-muted" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Web3 Revolution?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a blockchain expert or just getting started, our community welcomes you. Connect with
            like-minded individuals, learn from industry experts, and be part of Uganda's Web3 future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Join Our Community
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-5 py-3 text-base font-medium transition-colors hover:bg-muted"
            >
              Explore Events
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

