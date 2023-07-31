"use client"

import React, { ReactNode } from "react"
import { UserContext } from "../../lib/context"
import { User, Character } from "@prisma/client"

export default function ClientMenuContextProvider({
	children,
	user,
}: {
	children: ReactNode,
	user: User & { characters: Character[] },
})
{
	return (
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	)
}