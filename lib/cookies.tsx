"use client"

import { ReactNode, createContext, useContext } from "react"

const UserIdContext = createContext(0)
export const useUserId = () => useContext(UserIdContext)

const CharacterIdContext = createContext(0)
export const useCharacterId = () => useContext(CharacterIdContext)

export function CookieDataClientProvider({
	children,
	userId,
	characterId,
}: {
	children: ReactNode,
	userId: number,
	characterId: number,
})
{
	return (
		<UserIdContext.Provider value={userId}>
			<CharacterIdContext.Provider value={characterId}>
				{children}
			</CharacterIdContext.Provider>
		</UserIdContext.Provider>
	)
}