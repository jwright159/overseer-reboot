"use client"

import { useEffect, useState, useTransition } from "react"
import { deleteCharacter } from "@/lib/registration"
import { useRouter } from "next/navigation"
import MainPanel from "@/components/main-panel"
import { usePlayerCharacter } from "@/lib/context/character"
import { useSetEntity, usePlayerEntity } from "@/lib/context/entity"

export default function Overview()
{
	const router = useRouter()

	const character = usePlayerCharacter()!
	const entity = usePlayerEntity()!
	const setEntity = useSetEntity()
	
	const [powerValue, setPowerValue] = useState(entity.power)
	useEffect(() => setPowerValue(entity.power), [entity.power])

	const [isPending, startTransition] = useTransition()
	
	return (
		<MainPanel title="Character Overview">
			<form onSubmit={(event) => {
				event.preventDefault()
				startTransition(async () => await setEntity({...entity, power: powerValue}))
			}}>
				Current Power: {entity.power}
				<div>
					<label htmlFor="power">Power:</label> <input type="number" id="power" name="power" value={powerValue} onChange={event => setPowerValue(parseInt(event.target.value))} disabled={isPending}/>
				</div>

				<input type="submit" value="Submit" disabled={isPending}/>
			</form>

			<div style={{ margin: 20, border: "red 2px solid", padding: 20 }}>
				<button onClick={() => deleteCharacter(character).then(router.refresh)}>Delete character</button>
			</div>
		</MainPanel>
	)
}
