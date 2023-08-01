"use client"

import { useNullableCharacter } from "@/lib/context"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function LoginCharacterRedirector({
	children
}: {
	children: ReactNode
})
{
	const router = useRouter()
	const character = useNullableCharacter()

	useEffect(() => 
	{
		if (!character)
			router.push("/select-character")
	})

	if (character) return <>{children}</>
}