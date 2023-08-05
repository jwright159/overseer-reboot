"use client"

import { useRegisterSession } from "@/lib/registration"

export default function RegisterSessionForm()
{
	const [isPending, errorText, register] = useRegisterSession()

	return (
		<form onSubmit={event => {
			event.preventDefault()
			const sessionName = `${event.currentTarget.sessionName.value}`
			register(sessionName)
		}}>
			<p><label htmlFor="sessionName">Name:</label> <input id="sessionName" name="sessionName" disabled={isPending}/></p>

			<input type="submit" value="Register" disabled={isPending}/>

			<p style={{ color: "red" }}>{errorText}</p>
		</form>
	)
}
