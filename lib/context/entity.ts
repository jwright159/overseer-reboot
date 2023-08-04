"use client"

import { Entity } from "@prisma/client"
import createCache from "./context"
import { usePlayerCharacter } from "./character"

export const [useEntity, useSetEntity] = createCache<Entity>("entity")

export const usePlayerEntity = () => useEntity(usePlayerCharacter()?.entityId!)