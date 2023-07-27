"use client"

import MainPanel from "../../components/main-panel"
import { changePower } from "../../lib/power"
import { useContext, useTransition } from "react"
import { CharacterContext, PowerContext, SetPowerContext } from "../../lib/context"
import { deleteCharacter } from "@/app/lib/registration"
import { useRouter } from "next/navigation"

export default function Overview()
{
	const router = useRouter()

	const character = useContext(CharacterContext)!
	const power = useContext(PowerContext)
	const setPower = useContext(SetPowerContext)

	const [isPending, startTransition] = useTransition()
	
	return (
		<MainPanel title="Character Overview">
			<form onSubmit={(event) => {
				event.preventDefault()
				const power = parseFloat(event.currentTarget.power.value)
				startTransition(() => changePower(character, power).then(power => setPower(power)))
			}}>
				Current Power: {power}
				<div>
					<label htmlFor="power">Power:</label> <input type="number" id="power" name="power" disabled={isPending}/>
				</div>

				<input type="submit" value="Submit" disabled={isPending}/>
			</form>

			<div style={{ margin: 20, border: "red 2px solid", padding: 20 }}>
				<button onClick={() => deleteCharacter(character).then(router.refresh)}>Delete character</button>
			</div>
		</MainPanel>
	)
}
