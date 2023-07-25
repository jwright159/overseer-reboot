"use client"

import MainPanel from "@/app/components/main-panel"
import LoginCharacterForm from "@/app/components/registration/login-character-form"
import RegisterCharacterForm from "@/app/components/registration/register-character-form"
import { unsetUser } from "@/app/lib/auth"
import { CharacterContext } from "@/app/lib/context"
import { useRouter } from "next/navigation"
import { ReactNode, useContext, useState, useTransition } from "react"

export default function LoginSwitch({
	children,
}: {
	children: ReactNode,
})
{
	const router = useRouter()

	const [isRegistering, setIsRegistering] = useState(false)
	
	const [isLogoutPending, startLogoutTransition] = useTransition()

	const character = useContext(CharacterContext)

	if (character) return children

	if (isRegistering)
		return (
			<MainPanel title="Register Character">
				<RegisterCharacterForm/>
				<p><a href="#" onClick={event =>
					{
						event.preventDefault()
						setIsRegistering(false)
					}
				}>Select character</a></p>
			</MainPanel>
		)
	else
		return (
			<MainPanel title="Select Character">
				<LoginCharacterForm/>
				<p><a href="#" onClick={event =>
					{
						event.preventDefault()
						setIsRegistering(true)
					}
				}>Register character</a></p>
				<button onClick={() => startLogoutTransition(() => unsetUser().then(() => router.refresh()))} disabled={isLogoutPending}>Logout</button>
			</MainPanel>
		)
}