"use client"

import { Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react"
import { ReferrerContext } from "@/lib/context"
import { usePathname } from "next/navigation"

export default function ReferrerContextProvider({
	children,
}: {
	children: ReactNode,
})
{
	const [referrer, setReferrer] = useState("/overview")
	const setReferrerCallback = useCallback(setReferrer, [setReferrer])

	return (
		<>
			<ReferrerContextProviderProvider setReferrer={setReferrerCallback}/>
			<ReferrerContext.Provider value={referrer}>
				{children}
			</ReferrerContext.Provider>
		</>
	)
}

function ReferrerContextProviderProvider({
	setReferrer
}: {
	setReferrer: Dispatch<SetStateAction<string>>
})
{
	const pathname = usePathname()

	if (!(
		pathname === "/login" ||
		pathname === "/register" ||
		pathname === "/select-character" ||
		pathname === "/register-character" ||
		pathname === "/register-session"
	))
		setReferrer(pathname)
	
	return <></>
}