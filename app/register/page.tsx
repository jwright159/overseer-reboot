"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { registerUser } from "../lib/auth"
import MainPanel from "../components/main-panel"

export default function Register()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	return (
		<MainPanel title="Register">
			<form onSubmit={event => {
				event.preventDefault()
				setErrorText("")

				const username = `${event.currentTarget.username.value}`
				const password = `${event.currentTarget.password.value}`

				startTransition(async () =>
				{
					try
					{
						await registerUser(username, password)
						router.refresh()
					}
					catch (error)
					{
						setErrorText((error as Error).message)
					}
				})
			}}>
				<p><label htmlFor="username">Username:</label> <input id="username" name="username" disabled={isPending}/></p>
				<p><label htmlFor="password">Password:</label> <input type="password" id="password" name="password" disabled={isPending}/></p>

				<input type="submit" value="Register" disabled={isPending}/>

				<p style={{ color: "red" }}>{errorText}</p>
			</form>
		</MainPanel>
	)
}
