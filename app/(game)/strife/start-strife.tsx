"use client"

import { CharacterContext } from "@/lib/context"
import { startStrife } from "@/lib/strife"
import { useRouter } from "next/navigation"
import { useContext, useTransition } from "react"

export default function StartStrife()
{
	const router = useRouter()

	const [isPending, startTransition] = useTransition()

	const character = useContext(CharacterContext)!

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