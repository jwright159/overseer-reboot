"use client"

import { useEntity } from "@/lib/context/entity"
import { usePlayerStrife } from "@/lib/context/strife"

export default function PlayStrife()
{
	const strife = usePlayerStrife()
	
	return (strife ?
			<ul>
				{strife.entityIds.map(id => <EntityEntry key={id} id={id}/>)}
			</ul>
		:
			<p>Loading strife...</p>
	)
}

function EntityEntry({
	id,
}: {
	id: number,
})
{
	const entity = useEntity(id)
	return (entity ?
			<li>{entity.name} - {entity.power} power</li>
		:
			<li>Loading entity...</li>
	)
}