import { Calendar, MapPin, Users, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import type { Event } from "../types"
import { formatDate } from "../utils/formatters"

interface EventCardProps {
  event: Event
  featured?: boolean
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  const { id, title, description, date, location, imageUrl, organizer, attendees, category, isVirtual, externalUrl } =
    event

  return (
    <div
      className={`group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative">
        <Link to={`/events/${id}`}>
          <img
            src={imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={title}
            className={`w-full object-cover transition-transform group-hover:scale-105 ${featured ? "h-64" : "h-48"}`}
          />
        </Link>
        <div className="absolute top-4 right-4">
          <span className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            <span>{isVirtual ? "Virtual" : location}</span>
          </div>
        </div>

        <Link to={`/events/${id}`}>
          <h3 className="mb-2 text-xl font-bold tracking-tight text-card-foreground hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 text-muted-foreground">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Users size={16} />
            <span>{attendees.length} attending</span>
          </div>

          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-primary hover:underline"
            >
              <span className="mr-1">Website</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

