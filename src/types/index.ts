export interface User {
  id: string
  name: string
  email: string
  role?: string
  bio?: string
  location?: string
  joinedDate: string
  eventsAttended?: number
  connections?: number
  interests?: string[]
  twitter?: string
  linkedin?: string
  website?: string
  avatar?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  location: string
  isVirtual: boolean
  virtualLink?: string
  imageUrl?: string
  category: string
  organizer: string
  organizerId: string
  attendees: string[]
  price?: number
  externalUrl?: string
  createdAt?: string
  agenda?: { time: string; activity: string }[]
  speakers?: { name: string; role: string; bio?: string; avatar?: string }[]
}

