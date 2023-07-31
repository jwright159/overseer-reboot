"use client"

import React, { ReactNode, useState } from "react"
import { CharacterContext, EntityContext, PowerContext, SetPowerContext, StrifeContext, UserContext } from "../../lib/context"
import { User, Character, Entity, Strife } from "@prisma/client"

export default function ClientGameContextProvider({
	children,
	user,
	character,
	entity,
	strife,
	power,
}: {
	children: ReactNode,
	user: User & { characters: (Character & { entity: Entity | null })[] },
	character: Character,
	entity: Entity,
	strife: Strife & { entities: Entity[] },
	power: number,
})
{
	const [getPower, setPower] = useState(power)
	return (
		<UserContext.Provider value={user}>
			<CharacterContext.Provider value={character}>
				<EntityContext.Provider value={entity}>
					<StrifeContext.Provider value={strife}>
						<PowerContext.Provider value={getPower}>
							<SetPowerContext.Provider value={setPower}>
								{children}
							</SetPowerContext.Provider>
						</PowerContext.Provider>
					</StrifeContext.Provider>
				</EntityContext.Provider>
			</CharacterContext.Provider>
		</UserContext.Provider>
	)
}