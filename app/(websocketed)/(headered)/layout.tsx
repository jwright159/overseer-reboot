"use client"

import { ReactNode } from "react"
import prisma from "@/lib/prisma"
import ClientGameContextProvider from "./components/client-game-context-provider"
import ClientMenuContextProvider from "./components/client-menu-context-provider"
import SBURBHeaderForPlayer from "./components/sburb-header-for-player"
import SBURBHeaderLite from "./components/sburb-header-lite"

export default function HeaderLayout({
	children,
}: {
	children: ReactNode,
}) {
	if (!user) return (
		<SBURBHeaderLite>
			{children}
		</SBURBHeaderLite>
	)

	if (!character) return (
		<ClientMenuContextProvider
			user={user}
		>
			<SBURBHeaderLite>
				{children}
			</SBURBHeaderLite>
		</ClientMenuContextProvider>
	)

	const strifeEntity = await prisma.entity.findUnique({
		where: {
			id: character.entity.id,
		},
		include: {
			strife: { include: {
				entities: true,
			}},
		}
	})
	const strife = strifeEntity!.strife!

	return (
		<ClientGameContextProvider
			user={user}
			character={character}
			entity={character.entity}
			power={character.entity.power}
			strife={strife}
		>
			<SBURBHeaderForPlayer>
				{children}
			</SBURBHeaderForPlayer>
		</ClientGameContextProvider>
	)
}