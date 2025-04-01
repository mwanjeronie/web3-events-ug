import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import EventsPage from "./pages/EventsPage"
import EventDetailPage from "./pages/EventDetailPage"
import CommunityPage from "./pages/CommunityPage"
import AboutPage from "./pages/AboutPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import CreateEventPage from "./pages/CreateEventPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { WalletProvider } from "./context/WalletContext"
import { EventsProvider } from "./context/EventsContext"
import { UserProvider } from "./context/UserContext"
// import "./App.css"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <WalletProvider>
          <EventsProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/events/:id" element={<EventDetailPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                    <Route path="/create-event" element={<CreateEventPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </EventsProvider>
        </WalletProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App

