"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { getSession, registerCharacter } from "@/lib/registration"
import { useUser } from "@/lib/context"
import Link from "next/link"
import { useReferrer } from "@/lib/referrer"

export default function RegisterCharacterForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const referrer = useReferrer()

	const user = useUser()

	return (
		<form onSubmit={event =>
		{
			event.preventDefault()
			setErrorText("")

			const sessionName = `${event.currentTarget.sessionName.value}`
			const characterName = `${event.currentTarget.characterName.value}`

			startTransition(async () =>
			{
				const session = await getSession(sessionName)
				if (typeof session === "string")
				{
					setErrorText(session)
					return
				}

				const character = await registerCharacter(user, session, characterName)
				if (typeof character === "string")
				{
					setErrorText(character)
					return
				}
				
				router.push(referrer)
			})
		}}>
			<p><label htmlFor="sessionName">Existing session name:</label> <input id="sessionName" name="sessionName" disabled={isPending}/> or <Link href="/register-session">create a new session</Link></p>

			<p><label htmlFor="characterName">Name:</label> <input id="characterName" name="characterName" disabled={isPending}/></p>

			<input type="submit" value="Register" disabled={isPending}/>

			<p style={{ color: "red" }}>{errorText}</p>
		</form>
	)
}
