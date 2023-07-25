"use client"

import LoginForm from "@/app/components/registration/login-form"
import MainPanel from "@/app/components/main-panel"
import { UserContext } from "@/app/lib/context"
import { ReactNode, useContext, useState } from "react"
import RegisterForm from "@/app/components/registration/register-form"

export default function LoginSwitch({
	children,
}: {
	children: ReactNode,
})
{
	const [isRegistering, setIsRegistering] = useState(false)

	const user = useContext(UserContext)

	if (user) return children

	if (isRegistering)
		return (
			<MainPanel title="Register">
				<RegisterForm/>
				<p><a href="#" onClick={event =>
					{
						event.preventDefault()
						setIsRegistering(false)
					}
				}>Login</a></p>
			</MainPanel>
		)
	else
		return (
			<MainPanel title="Login">
				<LoginForm/>
				<p><a href="#" onClick={event =>
					{
						event.preventDefault()
						setIsRegistering(true)
					}
				}>Register</a></p>
			</MainPanel>
		)
}