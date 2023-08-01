"use client"

import { useCharacter } from "@/lib/context"
import { startStrife } from "@/lib/strife"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function StartStrife()
{
	const router = useRouter()

	const [isPending, startTransition] = useTransition()

	const character = useCharacter()

	return (
		<button disabled={isPending} onClick={() =>
		{
			startTransition(async () =>
			{
				await startStrife(character)
				router.refresh()
			})
		}}>
			Start strife with 1 generic imp
		</button>
	)
}