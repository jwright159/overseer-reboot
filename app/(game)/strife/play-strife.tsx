"use client"

import { StrifeContext } from "@/lib/context"
import { useContext } from "react"

export default function PlayStrife()
{
	const strife = useContext(StrifeContext)!
	
	return (
		<ul>
			{strife.entities.map(entity => (
				<li key={entity.id}>
					{entity.name}
				</li>
			))}
		</ul>
	)
}