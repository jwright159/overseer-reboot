"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import Link from "next/link"
import MainPanel from "@/app/components/main-panel"
import { loginUser } from "@/app/lib/registration"

export default function LoginForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	return (
		<MainPanel title="Login">
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

				<input type="submit" value="Login" disabled={isPending}/>
			</form>
			
			<p style={{ color: "red" }}>{errorText}</p>

			<Link href="/register">Register</Link>
		</MainPanel>
	)
}