import { ReactNode } from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { ReferrerProvider } from "@/lib/referrer"
import { RegistrationProvider } from "@/lib/registration"

export const metadata: Metadata = {
	title: 'Overseer Reboot',
	description: 'The Overseer Project is a free text-based roleplaying game based on Homestuck\'s SBURB system, featuring Alchemy, Strifing, Denizens, Quests and more',
	keywords: 'homestuck,SBURB,rpg,game,browser game,simulator,roleplaying,rp,overseer project,alchemy,strifing',
}

export default async function RootLayout({
	children,
}: {
	children: ReactNode,
}) {
	return (
		<html lang="en">
			<body>
				<ReferrerProvider>
					<RegistrationProvider>
						{children}
					</RegistrationProvider>
				</ReferrerProvider>
			</body>
		</html>
	)
}