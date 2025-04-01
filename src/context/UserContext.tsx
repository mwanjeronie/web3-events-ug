import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "../types"
import { generateMockUsers } from "../utils/mockData"

interface UserContextType {
  user: User | null
  users: User[]
  isLoading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (name: string, email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  getUserById: (id: string) => User | null
  updateUser: (userData: Partial<User>) => Promise<User>
}

const UserContext = createContext<UserContextType>({
  user: null,
  users: [],
  isLoading: false,
  login: async () => ({ id: "" }) as User,
  register: async () => ({ id: "" }) as User,
  logout: async () => {},
  getUserById: () => null,
  updateUser: async () => ({ id: "" }) as User,
})

export const useUser = () => useContext(UserContext)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Initialize mock users
  useEffect(() => {
    const mockUsers = generateMockUsers(20)
    setUsers(mockUsers)
  }, [])

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For this demo, we'll simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user with matching email (in a real app, you'd also check password)
      const foundUser = users.find((u) => u.email === email)

      if (!foundUser) {
        throw new Error("User not found")
      }

      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      return foundUser
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For this demo, we'll simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if email is already in use
      if (users.some((u) => u.email === email)) {
        throw new Error("Email already in use")
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "Community Member",
        joinedDate: new Date().toISOString(),
        eventsAttended: 0,
        connections: 0,
      }

      setUsers((prevUsers) => [...prevUsers, newUser])
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return newUser
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      // In a real app, this might involve an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUser(null)
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getUserById = (id: string) => {
    return users.find((u) => u.id === id) || null
  }

  const updateUser = async (userData: Partial<User>) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!user) {
        throw new Error("No user logged in")
      }

      const updatedUser = { ...user, ...userData }

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Also update the user in the users array
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? updatedUser : u)))

      return updatedUser
    } catch (error) {
      console.error("Update user error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        isLoading,
        login,
        register,
        logout,
        getUserById,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

