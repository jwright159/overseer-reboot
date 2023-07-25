"use client"

import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { ReferrerContext } from "@/app/lib/context"
import { usePathname } from "next/navigation"

export default function ReferrerContextProvider({
	children,
}: {
	children: ReactNode,
})
{
	const [referrer, setReferrer] = useState("/overview")

	return (
		<>
			<ReferrerContextProviderProvider setReferrer={setReferrer}/>
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
		pathname === "/register-character"
	))
		setReferrer(pathname)
	
	return <></>
}