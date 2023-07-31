import "./globals.css"
import MainPanel from "./components/main-panel"
import { headers } from "next/headers"
import GameLayout from "./(menu)/layout"

export default function NotFound()
{
	const header = headers()

	return (
		<GameLayout>
			<MainPanel
				title={`404 - ${header.get("x-invoke-path")} Not Found`}
			>
				The requested resource was not found on the server.
			</MainPanel>
		</GameLayout>
	)
}