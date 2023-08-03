"use client"

import MainPanel from "@/components/main-panel"
import { useEntity } from "@/lib/context"
import PlayStrife from "./play-strife"
import StartStrife from "./start-strife"

export default function Strife()
{
	const entity = useEntity()

	return (
		<MainPanel title="Strife">
			{entity.strifeId
				? <PlayStrife/>
				: <StartStrife/>
			}
		</MainPanel>
	)
}