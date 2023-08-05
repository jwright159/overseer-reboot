"use client"

import MainPanel from "@/components/main-panel"
import { usePlayerCharacter } from "@/lib/context/character"
import { usePlayerEntity } from "@/lib/context/entity"
import { usePlayerUser } from "@/lib/context/user"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function GameCharacterLoginLayout({
	children,
}: {
	children: ReactNode,
})
{
	return (
		<LoginCharacterRedirector>
			{children}
		</LoginCharacterRedirector>
	)
}

export function LoginCharacterRedirector({
	children
}: {
	children: ReactNode
})
{
	const router = useRouter()
	const user = usePlayerUser()
	const character = usePlayerCharacter()
	const entity = usePlayerEntity()

	useEffect(() => 
	{
		if (user && character === undefined)
			router.push("/select-character")
	}, [user, character])

	return character && entity ? children :
		<MainPanel title="Loading">
			<p>Loading {character ? "entity" : "character"}...</p>
		</MainPanel>
}