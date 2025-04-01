"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, Clock, MapPin, Users, ExternalLink, Share2, Heart, MessageSquare } from "lucide-react"
import { useEvents } from "../context/EventsContext"
import { useUser } from "../context/UserContext"
import type { Event } from "../types"
import { formatDate } from "../utils/formatters"

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getEventById, isLoading } = useEvents()
  const { user } = useUser()
  const [event, setEvent] = useState<Event | null>(null)
  const [isAttending, setIsAttending] = useState(false)

  useEffect(() => {
    if (id) {
      const eventData = getEventById(id)
      setEvent(eventData)

      // Check if user is attending
      if (user && eventData) {
        setIsAttending(eventData.attendees.includes(user.id))
      }
    }
  }, [id, getEventById, user])

  const handleAttend = () => {
    if (!user) {
      // Redirect to login
      window.location.href = `/login?redirect=/events/${id}`
      return
    }

    setIsAttending(!isAttending)
    // In a real app, you would update the backend here
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/events"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse Events
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/events" className="text-primary hover:underline mb-4 inline-block">
          &larr; Back to Events
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative rounded-xl overflow-hidden mb-6">
            <img
              src={event.imageUrl || "/placeholder.svg?height=400&width=800"}
              alt={event.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
                {event.category}
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-2 h-5 w-5" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="mr-2 h-5 w-5" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{event.isVirtual ? "Virtual Event" : event.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="mr-2 h-5 w-5" />
              <span>{event.attendees.length} attending</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2>About This Event</h2>
            <p>{event.description}</p>

            {event.agenda && (
              <>
                <h2>Agenda</h2>
                <ul>
                  {event.agenda.map((item, index) => (
                    <li key={index}>
                      <strong>{item.time}</strong>: {item.activity}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {event.speakers && event.speakers.length > 0 && (
              <>
                <h2>Speakers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-border">
                      <div className="h-12 w-12 rounded-full bg-muted" />
                      <div>
                        <h3 className="font-medium">{speaker.name}</h3>
                        <p className="text-sm text-muted-foreground">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <h2 className="text-xl font-bold mb-4">Discussion</h2>
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Join the conversation</h3>
              <p className="text-muted-foreground mb-4">Connect with attendees and ask questions about this event.</p>
              <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Start a discussion
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Event Details</h2>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Share event">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Save event">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAttend}
                className={`w-full mb-4 inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium transition-colors ${
                  isAttending
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isAttending ? "Cancel Registration" : "Register for Event"}
              </button>

              {event.externalUrl && (
                <a
                  href={event.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mb-6 inline-flex items-center justify-center rounded-lg border border-input bg-background px-5 py-3 text-base font-medium transition-colors hover:bg-muted"
                >
                  Visit Event Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Date and Time</h3>
                  <p>{formatDate(event.date)}</p>
                  <p>
                    {event.startTime} - {event.endTime}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                  <p>{event.isVirtual ? "Virtual Event" : event.location}</p>
                  {event.isVirtual && event.virtualLink && (
                    <a
                      href={event.virtualLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      Join virtual event
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Organizer</h3>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-muted" />
                    <span>{event.organizer}</span>
                  </div>
                </div>

                {event.price !== undefined && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Price</h3>
                    <p>{event.price === 0 ? "Free" : `$${event.price}`}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">Share This Event</h2>
              <div className="flex space-x-2">
                <button className="flex-1 p-2 rounded-lg bg-[#1877F2] text-white">Facebook</button>
                <button className="flex-1 p-2 rounded-lg bg-[#1DA1F2] text-white">Twitter</button>
                <button className="flex-1 p-2 rounded-lg bg-[#0A66C2] text-white">LinkedIn</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

