"use client"

import SBURBHeaderLite from "@/app/(websocketed)/(headered)/components/sburb-header-lite"
import MainPanel from "@/components/main-panel"
import { useState, useEffect, ReactNode, createContext, useContext } from "react"
import { io, Socket } from "socket.io-client"

const WebSocketContext = createContext<Socket | null>(null)

export const useWebSocket = () => useContext(WebSocketContext)!

export function WebSocketProvider({
	children,
}: {
	children: ReactNode,
})
{
	const [socket, setSocket] = useState<Socket | null>(null)
	const [connected, setConnected] = useState(false)

	useEffect(() =>
	{
		const socket = io()
		setSocket(socket)

		socket.on("connect", () =>
		{
			console.log(`Connected ${socket.id}`)
			setConnected(true)
		})
		socket.on("disconnect", reason =>
		{
			console.log(`Disconnected, ${reason}`)
			setConnected(false)
		})

		return () =>
		{
			socket.disconnect()
		}
	}, [])

	return (socket && connected ?
		<WebSocketContext.Provider value={socket}>
			{children}
		</WebSocketContext.Provider>
		:
		<SBURBHeaderLite>
			<MainPanel title="Please wait">
				<p>Connecting to server...</p>
			</MainPanel>
		</SBURBHeaderLite>
	)
}