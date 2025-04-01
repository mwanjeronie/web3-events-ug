"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { useWallet } from "../context/WalletContext"

export default function ConnectWalletButton() {
  const { isConnected, address, connect, disconnect } = useWallet()
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    try {
      setIsLoading(true)
      await connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    try {
      setIsLoading(true)
      await disconnect()
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
      {isConnected ? (
        <button
          onClick={handleDisconnect}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          <Wallet size={16} />
          <span>{formatAddress(address || "")}</span>
        </button>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
        >
          {isLoading ? (
            <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
          ) : (
            <Wallet size={16} />
          )}
          <span>Connect Wallet</span>
        </button>
      )}
    </>
  )
}

