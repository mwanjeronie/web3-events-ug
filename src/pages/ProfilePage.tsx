"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, MapPin, Users, Twitter, Linkedin, Globe, Edit } from "lucide-react"
import { useUser } from "../context/UserContext"
import { useEvents } from "../context/EventsContext"
import type { Event, User } from "../types"

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { user: currentUser, getUserById } = useUser()
  const { events, fetchEvents } = useEvents()
  const [user, setUser] = useState<User | null>(null)
  const [userEvents, setUserEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        if (id) {
          const userData = getUserById(id)
          setUser(userData)
          await fetchEvents()
        }
      } catch (error) {
        console.error("Error loading profile data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [id, getUserById, fetchEvents])

  useEffect(() => {
    if (events.length > 0 && user) {
      // Filter events created by the user
      const filteredEvents = events.filter((event) => event.organizerId === user.id)
      setUserEvents(filteredEvents)
    }
  }, [events, user])

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p className="text-muted-foreground mb-8">The user you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/community"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Browse Community
        </Link>
      </div>
    )
  }

  const isOwnProfile = currentUser && currentUser.id === user.id

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
            <div className="flex flex-col items-center text-center">
              <div className="h-32 w-32 rounded-full bg-muted mb-4"></div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary my-2">
                {user.role || "Community Member"}
              </span>

              <p className="text-muted-foreground mt-4 mb-6">{user.bio || "No bio provided yet."}</p>

              <div className="flex space-x-4 mb-6">
                {user.twitter && (
                  <a
                    href={user.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <Twitter size={20} />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {user.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin size={20} />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <Globe size={20} />
                    <span className="sr-only">Website</span>
                  </a>
                )}
              </div>

              <div className="w-full border-t border-border pt-6 mt-2">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{userEvents.length}</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{user.eventsAttended || 0}</div>
                    <div className="text-xs text-muted-foreground">Attended</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{user.connections || 0}</div>
                    <div className="text-xs text-muted-foreground">Connections</div>
                  </div>
                </div>
              </div>

              {isOwnProfile ? (
                <Link
                  to="/profile/edit"
                  className="w-full inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted mt-6"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              ) : (
                <button className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 mt-6">
                  <Users className="mr-2 h-4 w-4" />
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border border-border p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <div className="space-y-4">
              {user.location && (
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <h3 className="text-sm font-medium">Location</h3>
                    <p className="text-muted-foreground">{user.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Member Since</h3>
                  <p className="text-muted-foreground">
                    {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "Unknown"}
                  </p>
                </div>
              </div>

              {user.interests && user.interests.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <span key={index} className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Events Organized</h2>
            {userEvents.length > 0 ? (
              <div className="space-y-4">
                {userEvents.map((event) => (
                  <div key={event.id} className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={event.imageUrl || "/placeholder.svg?height=200&width=300"}
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
                            <MapPin className="mr-1 h-4 w-4" />
                            <span>{event.isVirtual ? "Virtual" : event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            <span>{event.attendees.length} attending</span>
                          </div>
                        </div>
                        <Link
                          to={`/events/${event.id}`}
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          View Event
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-muted/50 rounded-xl p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No events organized yet</h3>
                <p className="text-muted-foreground">
                  {isOwnProfile
                    ? "You haven't organized any events yet."
                    : `${user.name} hasn't organized any events yet.`}
                </p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="bg-muted/50 rounded-xl p-8 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No recent activity</h3>
              <p className="text-muted-foreground">
                {isOwnProfile ? "Your activity will appear here." : `${user.name}'s activity will appear here.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

