"use client"

import MainPanel from "@/components/main-panel"
import PlayStrife from "./play-strife"
import StartStrife from "./start-strife"
import { usePlayerEntity } from "@/lib/context/entity"

export default function Strife()
{
	const entity = usePlayerEntity()!

	return (
		<MainPanel title="Strife">
			{entity.strifeId
				? <PlayStrife/>
				: <StartStrife/>
			}
		</MainPanel>
	)
}