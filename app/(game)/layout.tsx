import { ReactNode } from "react"
import GameLoginLayout from "@/app/(logged in menu)/layout"
import LoginCharacterRedirector from "@/app/(game)/login-character-redirector"

export default async function GameCharacterLoginLayout({
	children,
}: {
	children: ReactNode,
})
{
	return (
		<GameLoginLayout>
			<LoginCharacterRedirector>
				{children}
			</LoginCharacterRedirector>
		</GameLoginLayout>
	)
}