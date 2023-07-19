"use client"

import MainPanel from "../../components/main-panel"
import { changePower } from "../../lib/power"
import { useContext, useTransition } from "react"
import { PowerContext, SetPowerContext } from "../../lib/context"

export default function Overview()
{
	const power = useContext(PowerContext)
	const setPower = useContext(SetPowerContext)
	const [isPending, startTransition] = useTransition()
	
	return (
		<MainPanel title="Character Overview">
			<form onSubmit={(event) => {
				event.preventDefault()
				const power = parseFloat(event.currentTarget.power.value)
				startTransition(() => changePower(power).then(power => setPower(power)))
			}}>
				Current Power: {power}
				<div>
					<label htmlFor="power">Power:</label> <input type="number" id="power" name="power" disabled={isPending}/>
				</div>

				<input type="submit" value="Submit" disabled={isPending}/>
			</form>
		</MainPanel>
	)
}
