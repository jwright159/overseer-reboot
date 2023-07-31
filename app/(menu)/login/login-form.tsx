"use client"

import { useRouter } from "next/navigation"
import { useContext, useState, useTransition } from "react"
import { loginUser } from "@/lib/registration"
import { ReferrerContext } from "@/lib/context"

export default function LoginForm()
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
				try
				{
					await loginUser(username, password)
					router.push(referrer)
				}
				catch (error)
				{
					setErrorText((error as Error).message)
				}
			})
		}}>
			<p><label htmlFor="username">Username:</label> <input id="username" name="username" disabled={isPending}/></p>
			<p><label htmlFor="password">Password:</label> <input type="password" id="password" name="password" disabled={isPending}/></p>

			<input type="submit" value="Login" disabled={isPending}/>

			<p style={{ color: "red" }}>{errorText}</p>
		</form>
	)
}