"use client"

import { ReactNode } from "react"
import { usePlayerEntity } from "@/lib/context/entity"
import SBURBHeader from "./components/sburb-header"

export default function HeaderLayout({
	children,
}: {
	children: ReactNode,
}) {
	const entity = usePlayerEntity()

	if (!entity) return (
		<SBURBHeader>
			{children}
		</SBURBHeader>
	)

	return (
		<SBURBHeader
			isLoggedIn

			name={entity.name}
			symbol="/images/symbols/aspect_light.png"
			boondollars={0}
			aspect="light"
			displayClasspect="Knight of Light"
			echeladderRung={0}
			strifePower={entity.power}

			health={1}
			maxHealth={1}
			energy={1}
			maxEnergy={1}
		>
			{children}
		</SBURBHeader>
	)
}