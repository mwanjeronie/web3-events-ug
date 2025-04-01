"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Calendar, Users, Clock, Plus, Settings, LogOut } from "lucide-react"
import { useUser } from "../context/UserContext"
import { useEvents } from "../context/EventsContext"
import type { Event } from "../types"

export default function DashboardPage() {
  const { user, logout } = useUser()
  const { events, fetchEvents, isLoading } = useEvents()
  const [userEvents, setUserEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState("upcoming")
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    fetchEvents()
  }, [user, navigate, fetchEvents])

  useEffect(() => {
    if (events.length > 0 && user) {
      // Filter events created by the user or events the user is attending
      const filteredEvents = events.filter(
        (event) => event.organizerId === user.id || event.attendees.includes(user.id),
      )
      setUserEvents(filteredEvents)
    }
  }, [events, user])

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  if (!user) {
    return null // Redirect handled in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-muted mb-4"></div>
            <h2 className="font-bold text-lg">{user.name}</h2>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              Community Member
            </span>
            <Link
              to="/profile/edit"
              className="w-full inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 space-y-2">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                activeTab === "upcoming" ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              <Calendar className="h-5 w-5" />
              <span>Upcoming Events</span>
            </Link>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                activeTab === "my-events" ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
              onClick={() => setActiveTab("my-events")}
            >
              <Users className="h-5 w-5" />
              <span>My Events</span>
            </Link>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                activeTab === "past" ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
              onClick={() => setActiveTab("past")}
            >
              <Clock className="h-5 w-5" />
              <span>Past Events</span>
            </Link>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <button
              onClick={handleLogout}
              className="w-full inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {activeTab === "upcoming" && "Upcoming Events"}
              {activeTab === "my-events" && "My Events"}
              {activeTab === "past" && "Past Events"}
            </h1>
            <Link
              to="/create-event"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : userEvents.length > 0 ? (
            <div className="space-y-4">
              {userEvents.map((event) => (
                <div key={event.id} className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4">
                      <img
                        src={event.imageUrl || "/placeholder.svg?height=200&width=200"}
                        alt={event.title}
                        className="w-full h-full object-cover md:h-40"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {event.category}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4" />
                          <span>{event.attendees.length} attending</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/events/${event.id}`}
                          className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                        >
                          View Details
                        </Link>
                        {event.organizerId === user.id && (
                          <>
                            <Link
                              to={`/events/${event.id}/edit`}
                              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                            >
                              Edit Event
                            </Link>
                            <button className="inline-flex items-center justify-center rounded-lg border border-destructive bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground">
                              Cancel Event
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === "upcoming" && "You haven't registered for any upcoming events yet."}
                {activeTab === "my-events" && "You haven't created any events yet."}
                {activeTab === "past" && "You haven't attended any past events."}
              </p>
              {activeTab === "my-events" ? (
                <Link
                  to="/create-event"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Event
                </Link>
              ) : (
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Browse Events
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

