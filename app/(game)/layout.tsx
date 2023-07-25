import { ReactNode } from "react"
import GameLayout from "@/app/(menu)/layout"
import LoginSwitch from "@/app/components/registration/login-switch"
import LoginCharacterSwitch from "@/app/components/registration/login-character-switch"

export default async function GameLoginLayout({
	children,
}: {
	children: ReactNode,
})
{
	return (
		<GameLayout>
			<LoginSwitch>
				<LoginCharacterSwitch>
					{children}
				</LoginCharacterSwitch>
			</LoginSwitch>
		</GameLayout>
	)
}