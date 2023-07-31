import { Character, Entity, Strife, User } from "@prisma/client"
import { createContext } from "react"

export const ReferrerContext = createContext("")

export const UserContext = createContext<(User & { characters: (Character & { entity: Entity | null })[] }) | null>(null)
export const CharacterContext = createContext<Character | null>(null)
export const EntityContext = createContext<Entity | null>(null)

export const PowerContext = createContext(0)
export const SetPowerContext = createContext((power: number) => {})

export const StrifeContext = createContext<(Strife & { entities: Entity[] }) | null>(null)