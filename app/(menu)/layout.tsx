import { ReactNode } from "react"
import { getUser } from "../lib/auth"
import { GameLayout } from "../(game)/layout"

export default async function GameLoginLayout({
	children,
}: {
	children: ReactNode,
}) {
	return (
		<GameLayout>
			{children}
		</GameLayout>
	)
}