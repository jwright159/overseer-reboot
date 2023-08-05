"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useReferrer } from "../referrer"
import { filterErrors } from "./context"
import { usePlayerUser } from "./user"
import { registerSession } from "./session-server"

export function useRegisterSession(): [boolean, string, typeof register]
{
	const router = useRouter()
	const referrer = useReferrer()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const user = usePlayerUser()!

	function register(sessionName: string)
	{
		startTransition(async () =>
		{
			const session = filterErrors(await registerSession(user, sessionName), setErrorText)
			if (!session) return
			
			setErrorText("")
			router.push(referrer)
		})
	}

	return [isPending, errorText, register]
}
