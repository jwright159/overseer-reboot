import { ReactNode } from "react"
import LoginForm from "../components/login-form"
import { getUser } from "../lib/auth"
import GameLayout from "../(menu)/layout"

export default async function GameLoginLayout({
	children,
}: {
	children: ReactNode,
}) {
	const user = await getUser()

	return (
		<GameLayout>
			{ user ? children : <LoginForm/> }
		</GameLayout>
	)
}