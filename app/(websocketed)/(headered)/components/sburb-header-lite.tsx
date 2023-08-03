"use client"

import { ReactNode } from "react"
import SBURBHeader from './sburb-header'

export default function SBURBHeaderLite({
	children,
}: {
	children: ReactNode,
})
{
	return (
		<SBURBHeader
			symbol="/images/grist/Build_Grist.png"
		>
			{children}
		</SBURBHeader>
	)
}