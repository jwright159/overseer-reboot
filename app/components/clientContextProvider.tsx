"use client"

import React, { ReactNode, useState } from "react"
import { PowerContext, SetPowerContext } from "../lib/context"

export default function ClientContextProvider({
	children,
	power,
}: {
	children: ReactNode,
	power: number,
})
{
	const [getPower, setPower] = useState(power)
	return (
		<PowerContext.Provider value={getPower}>
			<SetPowerContext.Provider value={setPower}>
				{children}
			</SetPowerContext.Provider>
		</PowerContext.Provider>
	)
}