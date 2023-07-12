import './globals.css'
import type { Metadata } from 'next'
import SBURBHeader from './components/sburb-header'

export const metadata: Metadata = {
	title: 'Overseer Reboot',
	description: 'The Overseer Project is a free text-based roleplaying game based on Homestuck\'s SBURB system, featuring Alchemy, Strifing, Denizens, Quests and more',
	keywords: 'homestuck,SBURB,rpg,game,browser game,simulator,roleplaying,rp,overseer project,alchemy,strifing',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<SBURBHeader />
				{children}
			</body>
		</html>
	)
}
