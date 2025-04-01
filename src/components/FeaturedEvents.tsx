import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import EventCard from "./EventCard"
import type { Event } from "../types"

interface FeaturedEventsProps {
  events: Event[]
}

export default function FeaturedEvents({ events }: FeaturedEventsProps) {
  // Get the first event as the featured one, and the next 5 as regular events
  const featuredEvent = events[0]
  const regularEvents = events.slice(1, 6)

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <p className="text-muted-foreground mt-2">Discover the hottest Web3 events in Uganda</p>
          </div>
          <Link to="/events" className="inline-flex items-center text-primary hover:underline mt-4 sm:mt-0">
            View all events
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvent && (
            <div className="md:col-span-2 lg:col-span-3">
              <EventCard event={featuredEvent} featured={true} />
            </div>
          )}

          {regularEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

