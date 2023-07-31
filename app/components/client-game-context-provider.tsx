"use client"

import React, { ReactNode, useState } from "react"
import { CharacterContext, EntityContext, PowerContext, SetPowerContext, UserContext } from "../../lib/context"
import { User, Character, Entity } from "@prisma/client"

export default function ClientGameContextProvider({
	children,
	user,
	character,
	entity,
	power,
}: {
	children: ReactNode,
	user: User & { characters: (Character & { entity: Entity | null })[] },
	character: Character,
	entity: Entity,
	power: number,
})
{
	const [getPower, setPower] = useState(power)
	return (
		<UserContext.Provider value={user}>
			<CharacterContext.Provider value={character}>
				<EntityContext.Provider value={entity}>
					<PowerContext.Provider value={getPower}>
						<SetPowerContext.Provider value={setPower}>
							{children}
						</SetPowerContext.Provider>
					</PowerContext.Provider>
				</EntityContext.Provider>
			</CharacterContext.Provider>
		</UserContext.Provider>
	)
}