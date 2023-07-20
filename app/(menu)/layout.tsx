import { ReactNode } from "react"
import { getUser } from "../lib/auth"
import ClientContextProvider from "../components/clientContextProvider"
import SBURBHeaderForPlayer from "../components/sburb-header-for-player"
import SBURBHeaderLite from "../components/sburb-header-lite"

export default async function GameLayout({
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