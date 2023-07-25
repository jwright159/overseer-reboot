"use client"

import { useRouter } from "next/navigation"
import { useContext, useState, useTransition } from "react"
import { registerCharacter } from "@/app/lib/registration"
import { ReferrerContext, UserContext } from "@/app/lib/context"

export default function RegisterCharacter()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const referrer = useContext(ReferrerContext)

	const user = useContext(UserContext)!

	return (
		<form onSubmit={event => {
			event.preventDefault()
			setErrorText("")

			const characterName = `${event.currentTarget.characterName.value}`

			startTransition(async () =>
			{
				try
				{
					await registerCharacter(user, characterName)
					router.push(referrer)
				}
				catch (error)
				{
					setErrorText((error as Error).message)
				}
			})
		}}>
			<p><label htmlFor="characterName">Name:</label> <input id="characterName" name="characterName" disabled={isPending}/></p>

			<input type="submit" value="Register" disabled={isPending}/>

			<p style={{ color: "red" }}>{errorText}</p>
		</form>
	)
}
