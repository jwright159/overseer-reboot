"use client"

import MainPanel from "@/app/components/main-panel"
import { EntityContext } from "@/lib/context"
import { useContext } from "react"
import PlayStrife from "./play-strife"
import StartStrife from "./start-strife"

export default function Strife()
{
	const entity = useContext(EntityContext)!

	return (
		<MainPanel title="Strife">
			{entity.strifeId
				? <PlayStrife/>
				: <StartStrife/>
			}
		</MainPanel>
	)
}