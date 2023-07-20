import { ReactNode } from "react"
import ClientContextProvider from "@/app/components/clientContextProvider"
import SBURBHeaderForPlayer from "@/app/components/sburb-header-for-player"
import SBURBHeaderLite from "@/app/components/sburb-header-lite"
import { getUser } from "@/app/lib/auth"

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