import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, MapPin, Users, Image, Info } from "lucide-react"
import { useUser } from "../context/UserContext"
import { useEvents } from "../context/EventsContext"

const categories = [
  "Blockchain",
  "DeFi",
  "NFT",
  "DAO",
  "Web3",
  "Cryptocurrency",
  "Metaverse",
  "Gaming",
  "Developer",
  "Other",
]

export default function CreateEventPage() {
  const { user } = useUser()
  const { createEvent } = useEvents()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    isVirtual: false,
    virtualLink: "",
    category: "",
    price: "0",
    imageUrl: "",
    externalUrl: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!user) {
      navigate("/login")
      return
    }

    // Basic validation
    if (!formData.title || !formData.description || !formData.date || !formData.category) {
      setError("Please fill in all required fields")
      return
    }

    if (formData.isVirtual && !formData.virtualLink) {
      setError("Please provide a link for the virtual event")
      return
    }

    if (!formData.isVirtual && !formData.location) {
      setError("Please provide a location for the in-person event")
      return
    }

    try {
      setIsSubmitting(true)

      // In a real app, you would upload the image here
      // For now, we'll just use the URL directly

      await createEvent({
        ...formData,
        organizerId: user.id,
        organizer: user.name,
        price: Number.parseFloat(formData.price),
        attendees: [user.id], // Creator automatically attends
      })

      navigate("/dashboard")
    } catch (err) {
      console.error("Error creating event:", err)
      setError("Failed to create event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>

        {error && <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" />
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Event Title <span className="text-destructive">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g., Web3 Developer Meetup"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Event Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Describe your event..."
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category <span className="text-destructive">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Date and Time
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">
                  Event Date <span className="text-destructive">*</span>
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                    Start Time <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                    End Time <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Location
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="isVirtual"
                    name="isVirtual"
                    type="checkbox"
                    checked={formData.isVirtual}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-input bg-background focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="isVirtual" className="font-medium">
                    This is a virtual event
                  </label>
                </div>
              </div>

              {formData.isVirtual ? (
                <div>
                  <label htmlFor="virtualLink" className="block text-sm font-medium mb-1">
                    Virtual Event Link <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="virtualLink"
                    name="virtualLink"
                    type="url"
                    value={formData.virtualLink}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., https://zoom.us/j/123456789"
                    required={formData.isVirtual}
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1">
                    Event Location <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., Innovation Hub, Kampala"
                    required={!formData.isVirtual}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Image className="mr-2 h-5 w-5" />
              Media and Links
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                  Event Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g., https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Provide a URL to an image for your event. Recommended size: 1200x630 pixels.
                </p>
              </div>

              <div>
                <label htmlFor="externalUrl" className="block text-sm font-medium mb-1">
                  External Website URL
                </label>
                <input
                  id="externalUrl"
                  name="externalUrl"
                  type="url"
                  value={formData.externalUrl}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g., https://example.com"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  If you have a dedicated website for this event, provide the URL here.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Attendance
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Ticket Price (USD)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.00"
                />
                <p className="text-xs text-muted-foreground mt-1">Enter 0 for a free event.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

