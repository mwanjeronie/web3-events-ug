import { Users, MessageSquare, Calendar, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function CommunityHighlights() {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Community</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Join a thriving ecosystem of Web3 enthusiasts, developers, and entrepreneurs in Uganda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">500+ Members</h3>
            <p className="text-muted-foreground mb-4">
              Connect with over 500 Web3 enthusiasts, developers, and entrepreneurs across Uganda.
            </p>
            <Link to="/community" className="inline-flex items-center text-primary hover:underline">
              Meet the community
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Active Discussions</h3>
            <p className="text-muted-foreground mb-4">
              Engage in meaningful conversations about blockchain, cryptocurrencies, and Web3 technologies.
            </p>
            <Link to="/community" className="inline-flex items-center text-primary hover:underline">
              Join the conversation
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Regular Meetups</h3>
            <p className="text-muted-foreground mb-4">
              Participate in regular online and in-person events to learn, network, and grow in the Web3 space.
            </p>
            <Link to="/events" className="inline-flex items-center text-primary hover:underline">
              Explore events
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Join Our Community
          </Link>
        </div>
      </div>
    </section>
  )
}

