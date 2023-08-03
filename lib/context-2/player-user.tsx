"use client"

import { ReactNode, createContext, useContext } from "react"
import { User } from "@prisma/client"

const PlayerUserContext = createContext<User | null>(null)

export const usePlayerUser = () => useContext(PlayerUserContext)!
export const useNullablePlayerUser = () => useContext(PlayerUserContext)

export function PlayerUserContextProvider({
	children,
	userId,
}: {
	children: ReactNode,
	userId: number,
})
{
	const user = useUser(userId)

	return (
		<PlayerUserContext.Provider value={user}>
			{children}
		</PlayerUserContext.Provider>
	)
}