import { ReactNode } from "react"
import GameLayout from "@/app/(menu)/layout"
import LoginSwitch from "@/app/components/registration/login-switch"

export default async function GameLoginLayout({
	children,
}: {
	children: ReactNode,
})
{
	return (
		<GameLayout>
			<LoginSwitch>
				{children}
			</LoginSwitch>
		</GameLayout>
	)
}