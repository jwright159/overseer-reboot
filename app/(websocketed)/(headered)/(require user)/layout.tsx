"use client"

import { useNullableUser } from "@/lib/context"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default async function GameLoginLayout({
	children,
}: {
	children: ReactNode,
})
{
	return (
		<LoginRedirector>
			{children}
		</LoginRedirector>
	)
}

function LoginRedirector({
	children
}: {
	children: ReactNode
})
{
	const router = useRouter()
	const user = useNullableUser()

	useEffect(() => 
	{
		if (!user)
			router.push("/login")
	})

	if (user) return children
}