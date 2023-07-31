"use client"

import { useRouter } from "next/navigation"
import { useContext, useState, useTransition } from "react"
import { registerUser } from "@/lib/registration"
import { ReferrerContext } from "@/lib/context"

export default function RegisterForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const referrer = useContext(ReferrerContext)

	return (
		<form onSubmit={event => {
			event.preventDefault()
			setErrorText("")

			const username = `${event.currentTarget.username.value}`
			const password = `${event.currentTarget.password.value}`

			startTransition(async () =>
			{
				const user = await registerUser(username, password)
				if (typeof user === "string")
				{
					setErrorText(user)
					return
				}

				router.push(referrer)
			})
		}}>
			<p><label htmlFor="username">Username:</label> <input id="username" name="username" disabled={isPending}/></p>
			<p><label htmlFor="password">Password:</label> <input type="password" id="password" name="password" disabled={isPending}/></p>

			<input type="submit" value="Register" disabled={isPending}/>

			<p style={{ color: "red" }}>{errorText}</p>
		</form>
	)
}
