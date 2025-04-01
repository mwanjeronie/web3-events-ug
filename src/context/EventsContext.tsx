"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Event } from "../types"
import { generateMockEvents } from "../utils/mockData"

interface EventsContextType {
  events: Event[]
  isLoading: boolean
  fetchEvents: () => Promise<void>
  getEventById: (id: string) => Event | null
  createEvent: (eventData: Partial<Event>) => Promise<Event>
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<Event>
  deleteEvent: (id: string) => Promise<void>
}

const EventsContext = createContext<EventsContextType>({
  events: [],
  isLoading: false,
  fetchEvents: async () => {},
  getEventById: () => null,
  createEvent: async () => ({ id: "" }) as Event,
  updateEvent: async () => ({ id: "" }) as Event,
  deleteEvent: async () => {},
})

export const useEvents = () => useContext(EventsContext)

interface EventsProviderProps {
  children: ReactNode
}

export const EventsProvider = ({ children }: EventsProviderProps) => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchEvents = useCallback(async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For this demo, we'll use mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockEvents = generateMockEvents(10)
      setEvents(mockEvents)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getEventById = useCallback(
    (id: string) => {
      return events.find((event) => event.id === id) || null
    },
    [events],
  )

  const createEvent = useCallback(async (eventData: Partial<Event>) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For this demo, we'll simulate creating an event
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newEvent: Event = {
        id: `event-${Date.now()}`,
        title: eventData.title || "",
        description: eventData.description || "",
        date: eventData.date || new Date().toISOString(),
        startTime: eventData.startTime || "10:00",
        endTime: eventData.endTime || "12:00",
        location: eventData.location || "",
        isVirtual: eventData.isVirtual || false,
        virtualLink: eventData.virtualLink || "",
        imageUrl: eventData.imageUrl || "",
        category: eventData.category || "Other",
        organizer: eventData.organizer || "Unknown",
        organizerId: eventData.organizerId || "",
        attendees: eventData.attendees || [],
        price: eventData.price || 0,
        externalUrl: eventData.externalUrl || "",
        createdAt: new Date().toISOString(),
      }

      setEvents((prevEvents) => [newEvent, ...prevEvents])
      return newEvent
    } catch (error) {
      console.error("Error creating event:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateEvent = useCallback(
    async (id: string, eventData: Partial<Event>) => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For this demo, we'll simulate updating an event
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const updatedEvents = events.map((event) => {
          if (event.id === id) {
            return { ...event, ...eventData }
          }
          return event
        })

        setEvents(updatedEvents)
        return updatedEvents.find((event) => event.id === id) as Event
      } catch (error) {
        console.error("Error updating event:", error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [events],
  )

  const deleteEvent = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For this demo, we'll simulate deleting an event
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id))
    } catch (error) {
      console.error("Error deleting event:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        fetchEvents,
        getEventById,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

