"use client"

import { usePlayerCharacter } from "@/lib/context/character"
import { startStrife } from "@/lib/strife"
import { useTransition } from "react"

export default function StartStrife()
{
	const [isPending, startTransition] = useTransition()

	const character = usePlayerCharacter()!

	return (
		<button disabled={isPending} onClick={() =>
		{
			startTransition(async () =>
			{
				await startStrife(character)
			})
		}}>
			Start strife with 1 generic imp
		</button>
	)
}