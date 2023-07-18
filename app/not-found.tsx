import MainPanel from "./components/main-panel"
import RootLayout from "./layout"
import { headers } from "next/headers"

export default function NotFound()
{
	const header = headers()

	return (
		<RootLayout>
			<MainPanel
				title={`404 - ${header.get("x-invoke-path")} Not Found`}
			>
				The requested resource was not found on the server.
			</MainPanel>
		</RootLayout>
	)
}