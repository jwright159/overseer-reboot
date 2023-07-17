import './globals.css'
import type { Metadata } from 'next'
import SBURBHeader from './components/sburb-header'
import ClientContextProvider from './components/clientContextProvider'
import { getUser } from './lib/auth'
import LoginForm from './components/login-form'

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
	const user = await getUser()

	return (
		<html lang="en">
			<body>
				{ user ?
					<ClientContextProvider power={user.power}>
						<SBURBHeader />
						{children}
					</ClientContextProvider>
				:
					<>
						Not logged in
						<LoginForm />
					</>
				}
			</body>
		</html>
	)
}