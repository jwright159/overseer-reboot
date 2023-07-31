"use client"

import { CharacterContext } from "@/lib/context"
import { useRouter } from "next/navigation"
import { ReactNode, useContext } from "react"

export default function LoginCharacterRedirector({
	children
}: {
	children: ReactNode
})
{
	const router = useRouter()
	const character = useContext(CharacterContext)

	if (character) return <>{children}</>

	router.push("/select-character")
}