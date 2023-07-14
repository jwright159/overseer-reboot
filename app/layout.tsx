import './globals.css'
import type { Metadata } from 'next'
import SBURBHeader from './components/sburb-header'
import ClientContextProvider from './components/clientContextProvider'
import prisma from './lib/prisma'

export const metadata: Metadata = {
	title: 'Overseer Reboot',
	description: 'The Overseer Project is a free text-based roleplaying game based on Homestuck\'s SBURB system, featuring Alchemy, Strifing, Denizens, Quests and more',
	keywords: 'homestuck,SBURB,rpg,game,browser game,simulator,roleplaying,rp,overseer project,alchemy,strifing',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const power = (await prisma.sample.findUnique({ where: { id: 1 } }))?.power ?? 0

	return (
		<html lang="en">
			<body>
				<ClientContextProvider power={power}>
					<SBURBHeader />
					{children}
				</ClientContextProvider>
			</body>
		</html>
	)
}
