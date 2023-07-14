"use client"

import { Metadata } from "next";
import Panel from "../components/panel";
import { changePower } from "../actions/power";
import { useContext, useTransition } from "react";
import { PowerContext, SetPowerContext } from "../lib/context";

export const metadata: Metadata = {
	title: "Overseer Reboot - Character Overview",
}

export default function Overview()
{
	const power = useContext(PowerContext)
	const setPower = useContext(SetPowerContext)
	const [isPending, startTransition] = useTransition()
	
	return (
		<main>
			<Panel title="Character Overview">
				<form onSubmit={(event) => {
					event.preventDefault()
					const power = parseFloat(event.currentTarget.power.value)
					startTransition(() => changePower(power).then(power => setPower(power)))
				}}>
					Current Power: {power}
					<div>
						<label htmlFor="power">Power:</label> <input type="number" id="power" name="power"/>
					</div>

					<input type="submit" value="Submit"/>
				</form>
			</Panel>
		</main>
	)
}
