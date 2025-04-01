import { ArrowRight, Users, Calendar, Globe } from "lucide-react"
import { Link } from "react-router-dom"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About Web3 Events UG</h1>
        <p className="text-muted-foreground text-lg">
          Building Uganda's Web3 ecosystem through community, education, and events.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            Web3 Events UG is dedicated to fostering the growth and adoption of Web3 technologies in Uganda. We believe
            in the transformative power of blockchain and decentralized technologies to create more equitable and
            accessible financial systems, particularly in emerging economies.
          </p>
          <p className="text-muted-foreground mb-6">
            Our mission is to build a vibrant community of Web3 enthusiasts, developers, entrepreneurs, and curious
            minds who can learn, connect, and build together. We aim to bridge the knowledge gap and provide resources
            that empower Ugandans to participate in the global Web3 revolution.
          </p>
          <div className="flex items-center space-x-4 mt-8">
            <Link
              to="/community"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Join Our Community
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Web3 Events UG Community"
            className="rounded-xl shadow-lg"
          />
          <div className="absolute -z-10 -bottom-6 -right-6 h-full w-full rounded-xl border border-border bg-muted" />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Host Events</h3>
            <p className="text-muted-foreground">
              We organize regular meetups, workshops, hackathons, and conferences focused on Web3 technologies, bringing
              together enthusiasts and experts to share knowledge and experiences.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Build Community</h3>
            <p className="text-muted-foreground">
              We foster a supportive and inclusive community where members can network, collaborate on projects, and
              help each other navigate the Web3 landscape.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Educate & Inform</h3>
            <p className="text-muted-foreground">
              We provide educational resources, tutorials, and workshops to help people understand blockchain
              technology, cryptocurrencies, and other Web3 concepts.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-6 flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-muted mb-4"></div>
              <h3 className="font-bold">Team Member {i + 1}</h3>
              <p className="text-sm text-primary mb-2">
                {["Founder", "Community Lead", "Technical Advisor", "Events Coordinator"][i]}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Passionate about Web3 and building communities in Uganda.
              </p>
              <div className="flex space-x-2 mt-auto">
                <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-6 flex items-center justify-center">
              <img src="/placeholder.svg?height=80&width=160" alt={`Partner ${i + 1}`} className="max-h-16" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Whether you're a blockchain expert or just getting started, our community welcomes you. Connect with
          like-minded individuals, learn from industry experts, and be part of Uganda's Web3 future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Join Our Community
          </Link>
          <Link
            to="/events"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-5 py-3 text-base font-medium transition-colors hover:bg-muted"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  )
}

