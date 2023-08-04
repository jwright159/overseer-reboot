"use client"

import { Strife } from "@prisma/client"
import createCache from "./context"
import { usePlayerEntity } from "./entity"

export const [useStrife, useSetStrife] = createCache<Strife>("strife")

export const usePlayerStrife = () =>
{
	const entity = usePlayerEntity()
	const strife = useStrife(entity?.strifeId ?? 0)
	return entity ? strife : undefined
}