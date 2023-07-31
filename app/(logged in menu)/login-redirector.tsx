"use client"

import { UserContext } from "@/lib/context"
import { useRouter } from "next/navigation"
import { ReactNode, useContext, useEffect } from "react"

export default function LoginRedirector({
	children
}: {
	children: ReactNode
})
{
	const router = useRouter()
	const user = useContext(UserContext)

	useEffect(() => 
	{
		if (!user)
			router.push("/login")
	})

	if (user) return children
}