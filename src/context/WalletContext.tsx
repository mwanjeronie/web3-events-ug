import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  balance: null,
  connect: async () => {},
  disconnect: async () => {},
})

export const useWallet = () => useContext(WalletContext)

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  // Check if wallet was previously connected
  useEffect(() => {
    const savedWalletState = localStorage.getItem("walletConnected")
    const savedAddress = localStorage.getItem("walletAddress")

    if (savedWalletState === "true" && savedAddress) {
      setIsConnected(true)
      setAddress(savedAddress)
      // In a real app, you would fetch the current balance here
      setBalance("0.0 ETH")
    }
  }, [])

  const connect = async () => {
    try {
      // In a real app, this would use window.ethereum or a Web3 library
      // For this demo, we'll simulate a connection
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockAddress =
        "0x" +
        Array(40)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("")
      setAddress(mockAddress)
      setBalance("1.5 ETH")
      setIsConnected(true)

      // Save connection state
      localStorage.setItem("walletConnected", "true")
      localStorage.setItem("walletAddress", mockAddress)

      return mockAddress
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  const disconnect = async () => {
    try {
      // In a real app, this would use window.ethereum or a Web3 library
      // For this demo, we'll simulate disconnection
      await new Promise((resolve) => setTimeout(resolve, 500))

      setAddress(null)
      setBalance(null)
      setIsConnected(false)

      // Clear saved connection state
      localStorage.removeItem("walletConnected")
      localStorage.removeItem("walletAddress")
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
      throw error
    }
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

