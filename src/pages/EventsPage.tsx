import { useEffect } from "react"
import { Calendar, MapPin } from "lucide-react"
import EventsList from "../components/EventsList"
import { useEvents } from "../context/EventsContext"

export default function EventsPage() {
  const { events, fetchEvents, isLoading } = useEvents()

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Web3 Events in Uganda</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover upcoming blockchain and Web3 events, meetups, workshops, and conferences in Uganda. Connect with
            the community and stay updated on the latest trends.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.slice(0, 2).map((event) => (
                  <div key={event.id} className="group relative overflow-hidden rounded-xl border border-border">
                    <div className="relative h-64">
                      <img
                        src={event.imageUrl || "/placeholder.svg?height=300&width=600"}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="mb-2 flex items-center space-x-4 text-white">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            <span className="text-sm">{event.isVirtual ? "Virtual" : event.location}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <EventsList events={events} title="All Events" showFilters={true} />
          </>
        )}
      </div>
    </div>
  )
}

