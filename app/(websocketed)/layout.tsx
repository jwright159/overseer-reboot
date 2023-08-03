import { getCharacterId, getUserId } from "@/lib/cookies-server"
import { WebSocketProvider } from "@/lib/websocket"
import { ReactNode } from "react"

export default async function WebSocketLayout({
	children,
}: {
	children: ReactNode,
})
{
	const user = await getUserId()
	const character = await getCharacterId(user)

	return (
		<WebSocketProvider>
			{children}
		</WebSocketProvider>
	)
}