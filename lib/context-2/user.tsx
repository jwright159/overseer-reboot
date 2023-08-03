"use client"

import { User } from "@prisma/client"
import { useWebSocket } from "../websocket"

export function useUser(id: number)
{
	const socket = useWebSocket()
	// This is an "acknowledgement", just call the callback from the server when done
	socket.emit("fetch-user", id, (user: User) => {

	})

	// I'm guessing there should either be useEffect or probably useSyncExternalStore

	return 
}