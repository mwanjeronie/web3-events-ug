import { useState } from "react"
import { Search, Users, MessageSquare, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

// Mock data for community members
const communityMembers = Array.from({ length: 12 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  role: ["Developer", "Enthusiast", "Investor", "Founder"][Math.floor(Math.random() * 4)],
  joinedDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  eventsAttended: Math.floor(Math.random() * 10),
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}))

// Mock data for discussions
const discussions = Array.from({ length: 5 }, (_, i) => ({
  id: `discussion-${i + 1}`,
  title: `Discussion topic ${i + 1}`,
  author: `User ${Math.floor(Math.random() * 12) + 1}`,
  date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  replies: Math.floor(Math.random() * 20),
  views: Math.floor(Math.random() * 100) + 20,
  category: ["General", "Technical", "Events", "Projects", "Announcements"][Math.floor(Math.random() * 5)],
}))

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("members")

  const filteredMembers = communityMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredDiscussions = discussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Web3 Community</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with Web3 enthusiasts, developers, and entrepreneurs in Uganda. Share knowledge, collaborate on
          projects, and grow together.
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${activeTab === "members" ? "members" : "discussions"}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex border-b border-border mb-8">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "members"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("members")}
        >
          <Users className="inline-block mr-2 h-4 w-4" />
          Members
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "discussions"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("discussions")}
        >
          <MessageSquare className="inline-block mr-2 h-4 w-4" />
          Discussions
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "events"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("events")}
        >
          <Calendar className="inline-block mr-2 h-4 w-4" />
          Past Events
        </button>
      </div>

      {activeTab === "members" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Community Members</h2>
            <span className="text-sm text-muted-foreground">{filteredMembers.length} members</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-card rounded-xl border border-border p-6 flex flex-col items-center text-center"
              >
                <div className="h-20 w-20 rounded-full bg-muted mb-4"></div>
                <h3 className="font-bold">{member.name}</h3>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-2">
                  {member.role}
                </span>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{member.bio}</p>
                <div className="mt-auto flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                </div>
                <Link
                  to={`/profile/${member.id}`}
                  className="mt-4 w-full inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "discussions" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Community Discussions</h2>
            <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              New Discussion
            </button>
          </div>

          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <div key={discussion.id} className="bg-card rounded-xl border border-border p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      to={`/discussions/${discussion.id}`}
                      className="text-lg font-bold hover:text-primary transition-colors"
                    >
                      {discussion.title}
                    </Link>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span>By {discussion.author}</span>
                      <span>{new Date(discussion.date).toLocaleDateString()}</span>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {discussion.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>{discussion.replies} replies</div>
                    <div>{discussion.views} views</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Past Events</h2>
            <Link
              to="/events"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              View All Events
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <img
                  src={`/placeholder.svg?height=200&width=400`}
                  alt={`Past Event ${i + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Web3 Meetup #{i + 1}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(2023, i, 15).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    A recap of our Web3 community meetup with discussions on blockchain technology and its applications.
                  </p>
                  <Link to={`/events/past-${i + 1}`} className="text-primary hover:underline text-sm">
                    View Recap
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

