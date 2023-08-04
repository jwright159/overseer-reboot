"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { registerSession } from "@/lib/registration"
import { useReferrer } from "@/lib/referrer"
import { usePlayerUser } from "@/lib/context/user"

export default function RegisterSessionForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const referrer = useReferrer()

	const user = usePlayerUser()!

	return (
		<form onSubmit={event => {
			event.preventDefault()
			setErrorText("")

			const sessionName = `${event.currentTarget.sessionName.value}`

			startTransition(async () =>
			{
				const session = await registerSession(user, sessionName)
				if (typeof session === "string")
				{
					setErrorText(session)
					return
				}

				router.push(referrer)
			})
		}}>
			<p><label htmlFor="sessionName">Name:</label> <input id="sessionName" name="sessionName" disabled={isPending}/></p>

			<input type="submit" value="Register" disabled={isPending}/>

			<p style={{ color: "red" }}>{errorText}</p>
		</form>
	)
}
