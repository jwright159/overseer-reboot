"use client"

import { CharacterContext } from "@/lib/context"
import { useRouter } from "next/navigation"
import { ReactNode, useContext, useEffect } from "react"

export default function LoginCharacterRedirector({
	children
}: {
	children: ReactNode
})
{
	const router = useRouter()
	const character = useContext(CharacterContext)

	useEffect(() => 
	{
		if (!character)
			router.push("/select-character")
	})

	if (character) return <>{children}</>
}