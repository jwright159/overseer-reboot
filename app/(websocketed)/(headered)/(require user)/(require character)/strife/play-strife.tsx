"use client"

import { useStrife } from "@/lib/context"

export default function PlayStrife()
{
	const strife = useStrife()
	
	return (
		<ul>
			{strife.entities.map(entity => (
				<li key={entity.id}>
					{entity.name} - {entity.power} power
				</li>
			))}
		</ul>
	)
}