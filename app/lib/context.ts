import { Character, User } from "@prisma/client"
import { createContext } from "react"

export const PowerContext = createContext(0)
export const SetPowerContext = createContext((power: number) => {})

export const UserContext = createContext<(User & { characters: Character[] }) | null>(null)
export const CharacterContext = createContext<Character | null>(null)