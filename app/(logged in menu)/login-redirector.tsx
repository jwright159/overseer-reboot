"use client"

import { UserContext } from "@/app/lib/context"
import { useRouter } from "next/navigation"
import { ReactNode, useContext } from "react"

export default function LoginRedirector({
	children
}: {
	children: ReactNode
})
{
	const router = useRouter()
	const user = useContext(UserContext)

	if (user) return <>{children}</>

	router.push("/login")
}