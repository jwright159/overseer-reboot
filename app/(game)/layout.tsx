import { ReactNode } from "react"
import ClientContextProvider from "../components/clientContextProvider"
import LoginForm from "../components/login-form"
import SBURBHeaderForPlayer from "../components/sburb-header-for-player"
import SBURBHeaderLite from "../components/sburb-header-lite"
import { getUser } from "../lib/auth"

export async function GameLayout({
	children,
}: {
	children: ReactNode,
}) {
	const user = await getUser()
	
	return (user ?
		<ClientContextProvider power={user.power}>
			<SBURBHeaderForPlayer />
			{children}
		</ClientContextProvider>
	:
		<>
			<SBURBHeaderLite />
			{children}
		</>
	)
}

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