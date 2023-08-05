import { CharacterIdProvider } from "@/lib/context/character-id"
import { UserIdProvider } from "@/lib/context/user-id"
import { WebSocketProvider } from "@/lib/websocket"
import { ReactNode } from "react"

export default async function WebSocketLayout({
	children,
}: {
	children: ReactNode,
})
{
	return (
		<UserIdProvider>
			<CharacterIdProvider>
				<WebSocketProvider>
					{children}
				</WebSocketProvider>
			</CharacterIdProvider>
		</UserIdProvider>
	)
}