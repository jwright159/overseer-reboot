"use client"

import { Character, Entity } from "@prisma/client"
import createCache from "./context"
import { useCharacterId } from "../cookies"
import { useCallback, useState } from "react"
import { useWebSocket } from "../websocket"

export const [useCharacter, useSetCharacter] = createCache<Character>("character")

export const usePlayerCharacter = () =>
{
	const characterId = useCharacterId()
	const character = useCharacter(characterId)
	return characterId ? character : undefined
}

export function useCharactersOfUser(userId: number)
{
	const socket = useWebSocket()
	const [characters, setCharacters] = useState<(Character & {entity: Entity})[] | null>(null)

	useCallback(() => socket.emit("fetch-characters-of-user", userId, setCharacters), [socket, userId])

	return characters
}