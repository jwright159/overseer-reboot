"use client"

import { useContext } from 'react'
import SBURBHeader from './sburb-header'
import { EntityContext, PowerContext } from '@/lib/context'

export default function SBURBHeaderForPlayer()
{
	const entity = useContext(EntityContext)!
	const power = useContext(PowerContext)

	return (
		<SBURBHeader
			isLoggedIn

			name={entity.name}
			symbol="/images/symbols/aspect_light.png"
			boondollars={0}
			aspect="light"
			displayClasspect="Knight of Light"
			echeladderRung={0}
			strifePower={power}

			health={1}
			maxHealth={1}
			energy={1}
			maxEnergy={1}
		/>
	)
}