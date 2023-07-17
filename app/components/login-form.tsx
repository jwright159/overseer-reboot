"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { setUser } from "../lib/auth"

export default function LoginForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	return (
		<form onSubmit={(event) => {
			event.preventDefault()
			setErrorText("")

			const userId = parseInt(event.currentTarget.userId.value)
			startTransition(() => setUser(userId).then(did => {
				if (did) router.refresh()
				else setErrorText("Invalid ID")
			}))
		}}>
			<label htmlFor="user-id">User ID:</label> <input type="number" id="user-id" name="userId" disabled={isPending}/>
			<input type="submit" value="Login" disabled={isPending}/>
			<p style={{ color: "red" }}>{errorText}</p>
		</form>
	)
}