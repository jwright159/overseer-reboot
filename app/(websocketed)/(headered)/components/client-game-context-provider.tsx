"use client"

import { ReactNode } from "react"
import { Character, CharacterContextProvider, Entity, EntityContextProvider, PowerContextProvider, Strife, StrifeContextProvider, User, UserContextProvider } from "@/lib/context"
import { changePower } from "@/lib/power"

export default function ClientGameContextProvider({
	children,
	user,
	character,
	entity,
	strife,
	power,
}: {
	children: ReactNode,
	user: User,
	character: Character,
	entity: Entity,
	strife: Strife,
	power: number,
})
{
	return (
		<UserContextProvider value={user}>
			<CharacterContextProvider value={character}>
				<EntityContextProvider value={entity}>
					<StrifeContextProvider value={strife}>
						<PowerContextProvider databaseValue={power} setDatabaseValue={(power) => changePower(entity, power)}>
							{children}
						</PowerContextProvider>
					</StrifeContextProvider>
				</EntityContextProvider>
			</CharacterContextProvider>
		</UserContextProvider>
	)
}