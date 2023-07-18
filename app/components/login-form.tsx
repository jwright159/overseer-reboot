"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { setUser } from "../lib/auth"
import MainPanel from "./main-panel"

export default function LoginForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	return (
		<MainPanel title="Login">
			<form onSubmit={(event) => {
				event.preventDefault()
				setErrorText("")

				const userId = parseInt(event.currentTarget.userId.value)
				startTransition(() => setUser(userId).then(did => {
					if (did) router.refresh()
					else setErrorText("Invalid ID")
				}))
			}}>
				<div>
					<label htmlFor="user-id">User ID:</label> <input type="number" id="user-id" name="userId" disabled={isPending}/>
				</div>

				<input type="submit" value="Login" disabled={isPending}/>

				<p style={{ color: "red" }}>{errorText}</p>
			</form>
		</MainPanel>
	)
}