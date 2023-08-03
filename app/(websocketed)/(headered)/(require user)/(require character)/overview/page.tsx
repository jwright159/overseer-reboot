"use client"

import { useTransition } from "react"
import { deleteCharacter } from "@/lib/registration"
import { useRouter } from "next/navigation"
import MainPanel from "@/components/main-panel"
import { useCharacter, usePower, useSetPower } from "@/lib/context"

export default function Overview()
{
	const router = useRouter()

	const character = useCharacter()
	const power = usePower()
	const setPower = useSetPower()

	const [isPending, startTransition] = useTransition()
	
	return (
		<MainPanel title="Character Overview">
			<form onSubmit={(event) => {
				event.preventDefault()
				const power = parseFloat(event.currentTarget.power.value)
				startTransition(setPower(power))
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
