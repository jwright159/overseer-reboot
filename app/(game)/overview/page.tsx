"use client"

import { useContext, useTransition } from "react"
import { deleteCharacter } from "@/lib/registration"
import { useRouter } from "next/navigation"
import MainPanel from "@/app/components/main-panel"
import { CharacterContext, EntityContext, PowerContext, SetPowerContext } from "@/lib/context"
import { changePower } from "@/lib/power"

export default function Overview()
{
	const router = useRouter()

	const character = useContext(CharacterContext)!
	const entity = useContext(EntityContext)!
	const power = useContext(PowerContext)
	const setPower = useContext(SetPowerContext)

	const [isPending, startTransition] = useTransition()
	
	return (
		<MainPanel title="Character Overview">
			<form onSubmit={(event) => {
				event.preventDefault()
				const power = parseFloat(event.currentTarget.power.value)
				startTransition(() => changePower(entity, power).then(setPower))
			}}>
				Current Power: {power}
				<div>
					<label htmlFor="power">Power:</label> <input type="number" id="power" name="power" defaultValue={power} disabled={isPending}/>
				</div>

				<input type="submit" value="Submit" disabled={isPending}/>
			</form>

			<div style={{ margin: 20, border: "red 2px solid", padding: 20 }}>
				<button onClick={() => deleteCharacter(character).then(router.refresh)}>Delete character</button>
			</div>
		</MainPanel>
	)
}
