"use client"

import { useEntity } from "@/lib/context/entity"
import { usePlayerStrife } from "@/lib/context/strife"

export default function PlayStrife()
{
	const strife = usePlayerStrife()
	
	return (
		<ul>
			{strife.entities.map(entity => <ListEntity key={entity.id} entityId={entity.id}/>)}
		</ul>
	)
}

function ListEntity({
	entityId,
}: {
	entityId: number,
})
{
	const entity = useEntity(entityId)
	return entity ? <li>{entity.name} - {entity.power} power</li> : <li>Loading entity...</li>
}