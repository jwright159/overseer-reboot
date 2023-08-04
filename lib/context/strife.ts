"use client"

import { Strife as StrifeModel } from "@prisma/client"
import createCache from "./context"
import { usePlayerEntity } from "./entity"

export interface Strife extends StrifeModel {
	entityIds: number[],
}

export const [useStrife, useSetStrife] = createCache<Strife>("strife")

export const usePlayerStrife = () =>
{
	const entity = usePlayerEntity()
	const strife = useStrife(entity?.strifeId ?? 0)
	return entity ? strife : undefined
}