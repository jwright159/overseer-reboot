"use client"

import { User } from "@prisma/client"
import { useWebSocket } from "../websocket"
import { useCallback, useSyncExternalStore } from "react"

const cache: Record<number, User> = {}

export function useUser(id: number)
{
	const socket = useWebSocket()

	const subscribe = useCallback((callback: () => void) =>
	{
		function cacheResult(user: User)
		{
			cache[user.id] = user
			callback()
		}

		socket.on("update-user", cacheResult)
		socket.emit("subscribe-user", id)

		return () =>
		{
			socket.off("update-user", cacheResult)
			socket.emit("unsubscribe-user", id)
		}
	}, [socket, id])

	function getSnapshot()
	{
		return cache[id] ?? null
	}
	
	return useSyncExternalStore(subscribe, getSnapshot)
}