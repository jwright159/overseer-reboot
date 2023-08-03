import { WebSocketProvider } from "@/lib/websocket"
import { ReactNode } from "react"

export default function WebSocketLayout({
	children,
}: {
	children: ReactNode,
})
{
	return (
		<WebSocketProvider>
			{children}
		</WebSocketProvider>
	)
}