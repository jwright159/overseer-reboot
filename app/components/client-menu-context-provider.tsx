"use client"

import React, { ReactNode } from "react"
import { User, UserContextProvider } from "@/lib/context"

export default function ClientMenuContextProvider({
	children,
	user,
}: {
	children: ReactNode,
	user: User,
})
{
	return (
		<UserContextProvider value={user}>
			{children}
		</UserContextProvider>
	)
}