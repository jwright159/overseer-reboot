"use client"

import { Entity } from "@prisma/client"
import { createCache } from "./context"
import { usePlayerCharacter } from "./character"

export const [useEntity, useSetEntity] = createCache<Entity>("entity")

export const usePlayerEntity = () => useEntity(usePlayerCharacter()?.entityId!)

export function useEntityState<TStateName extends keyof Entity, TState extends Entity[TStateName]>(entity: Entity, stateName: TStateName): [TState, (newState: TState) => void]
{
	const setEntity = useSetEntity()

	function setState(newState: TState)
	{
		setEntity({
			...entity,
			[stateName]: newState,
		})
	}

	return [<TState>entity[stateName], setState]
}