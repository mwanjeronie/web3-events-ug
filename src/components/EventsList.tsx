import { useState } from "react"
import { Search, Filter, Calendar, MapPin } from "lucide-react"
import EventCard from "./EventCard"
import type { Event } from "../types"

interface EventsListProps {
  events: Event[]
  title?: string
  showFilters?: boolean
}

export default function EventsList({ events, title = "Upcoming Events", showFilters = true }: EventsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")

  // Get unique categories and locations for filters
  const categories = ["All", ...new Set(events.map((event) => event.category))]
  const locations = [
    "All",
    "Virtual",
    ...new Set(events.filter((event) => !event.isVirtual).map((event) => event.location)),
  ]

  // Filter events based on search term and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "" || selectedCategory === "All" || event.category === selectedCategory

    const matchesLocation =
      selectedLocation === "" ||
      selectedLocation === "All" ||
      (selectedLocation === "Virtual" && event.isVirtual) ||
      (!event.isVirtual && event.location === selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}

      {showFilters && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Categories</option>
                {categories
                  .filter((cat) => cat !== "All")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-muted-foreground" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Locations</option>
                {locations
                  .filter((loc) => loc !== "All")
                  .map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  )
}

