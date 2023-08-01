"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const defaultReferrer = "/overview"

const ReferrerContext = createContext(defaultReferrer)
export const useReferrer = () => useContext(ReferrerContext)

export function ReferrerContextProvider({
	children,
}: {
	children: ReactNode,
})
{
	const [referrer, setReferrer] = useState(defaultReferrer)

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

	useEffect(() =>
	{
		if (!(
			pathname === "/login" ||
			pathname === "/register" ||
			pathname === "/select-character" ||
			pathname === "/register-character" ||
			pathname === "/register-session"
		))
			setReferrer(pathname)
	})
	
	return <></>
}