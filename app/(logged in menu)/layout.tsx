import { ReactNode } from "react"
import GameLayout from "@/app/(menu)/layout"
import LoginRedirector from "./login-redirector"

export default async function GameLoginLayout({
	children,
}: {
	children: ReactNode,
})
{
	return (
		<GameLayout>
			<LoginRedirector>
				{children}
			</LoginRedirector>
		</GameLayout>
	)
}