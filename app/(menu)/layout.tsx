import { ReactNode } from "react"
import ClientGameContextProvider from "@/app/components/client-game-context-provider"
import SBURBHeaderForPlayer from "@/app/components/sburb-header-for-player"
import SBURBHeaderLite from "@/app/components/sburb-header-lite"
import { getCharacter, getUser } from "@/lib/cookies"
import ClientMenuContextProvider from "@/app/components/client-menu-context-provider"

export default async function GameLayout({
	children,
}: {
	children: ReactNode,
}) {
	const user = await getUser()
	const character = await getCharacter(user)
	
	if (!user) return <>
		<SBURBHeaderLite />
		{children}
	</>

	if (!character) return <>
		<ClientMenuContextProvider
			user={user}
		>
			<SBURBHeaderLite />
			{children}
		</ClientMenuContextProvider>
	</>

	const entity = character.entity!

	return (
		<ClientGameContextProvider
			user={user}
			character={character}
			entity={entity}
			power={entity.power}
		>
			<SBURBHeaderForPlayer />
			{children}
		</ClientGameContextProvider>
	)
}