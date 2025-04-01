import type { User } from "../types"

export const generateMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
    joinedDate: new Date().toISOString() // Add joinedDate field
  }))}
