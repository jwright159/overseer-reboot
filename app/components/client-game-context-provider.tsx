"use client"

import React, { ReactNode, useState } from "react"
import { CharacterContext, PowerContext, SetPowerContext, UserContext } from "../lib/context"
import { User, Character } from "@prisma/client"

export default function ClientGameContextProvider({
	children,
	user,
	character,
	power,
}: {
	children: ReactNode,
	user: User & { characters: Character[] },
	character: Character,
	power: number,
})
{
	const [getPower, setPower] = useState(power)
	return (
		<UserContext.Provider value={user}>
			<CharacterContext.Provider value={character}>
				<PowerContext.Provider value={getPower}>
					<SetPowerContext.Provider value={setPower}>
						{children}
					</SetPowerContext.Provider>
				</PowerContext.Provider>
			</CharacterContext.Provider>
		</UserContext.Provider>
	)
}