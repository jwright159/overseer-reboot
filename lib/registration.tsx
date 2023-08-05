"use client"

import { ReactNode, createContext, useContext, useEffect, useState, useTransition } from "react"
import { deleteCharacter, getSession, loginUser, registerCharacter, registerUser, loginCharacter, registerSession } from "./registration-server"
import { useRouter } from "next/navigation"
import { useReferrer } from "./referrer"
import { getCharacterId, getUserId, setCharacter, setUser, unsetCharacter, unsetUser } from "./cookies-server"
import { usePlayerUser } from "./context/user"

const UserIdContext = createContext<number| null>(null)
const SetUserIdContext = createContext((id: number) => {})
export const useUserId = () => useContext(UserIdContext)
export function useLoginUser()
{
	const router = useRouter()
	const referrer = useReferrer()

	const setUserId = useContext(SetUserIdContext)
	
	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	function login(username: string, password: string)
	{
		startTransition(async () =>
		{
			const user = filterErrors(await loginUser(username, password), setErrorText)
			if (!user) return
			
			setErrorText("")
			await setUser(user)
			setUserId(user.id)
			router.push(referrer)
		})
	}

	function register(username: string, password: string)
	{
		startTransition(async () =>
		{
			const user = filterErrors(await registerUser(username, password), setErrorText)
			if (!user) return;
			
			setErrorText("")
			await setUser(user)
			setUserId(user.id)
			router.push(referrer)
		})
	}

	return {isPending, errorText, login, register}
}
export function useLogoutUser()
{
	const setUserId = useContext(SetUserIdContext)
	
	const [isPending, startTransition] = useTransition()

	function logout()
	{
		startTransition(async () =>
		{
			await unsetUser()
			setUserId(0)
		})
	}

	return {isPending, logout}
}

const CharacterIdContext = createContext<number| null>(null)
const SetCharacterIdContext = createContext((id: number) => {})
export const useCharacterId = () => useContext(CharacterIdContext)
export function useLoginCharacter()
{
	const router = useRouter()
	const referrer = useReferrer()

	const setCharacterId = useContext(SetCharacterIdContext)
	
	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const user = usePlayerUser()!

	function login(characterId: number)
	{
		startTransition(async () =>
		{
			const character = filterErrors(await loginCharacter(characterId), setErrorText)
			if (!character) return
			
			setErrorText("")
			await setCharacter(character)
			setCharacterId(character.id)
			router.push(referrer)
		})
	}

	function register(sessionName: string, characterName: string)
	{
		startTransition(async () =>
		{
			const session = filterErrors(await getSession(sessionName), setErrorText)
			if (!session) return

			const character = filterErrors(await registerCharacter(user, session, characterName), setErrorText)
			if (!character) return
			
			setErrorText("")
			await setCharacter(character)
			setCharacterId(character.id)
			router.push(referrer)
		})
	}

	return {isPending, errorText, login, register}
}
export function useLogoutCharacter()
{
	const setCharacterId = useContext(SetCharacterIdContext)
	
	const [isPending, startTransition] = useTransition()

	function logout()
	{
		startTransition(async () =>
		{
			await unsetCharacter()
			setCharacterId(0)
		})
	}

	return {isPending, logout}
}
export function useDeleteCharacter(): [boolean, typeof del]
{
	const setCharacterId = useContext(SetCharacterIdContext)
	
	const [isPending, startTransition] = useTransition()

	function del(id: number)
	{
		startTransition(async () =>
		{
			await deleteCharacter(id)
			await unsetCharacter()
			setCharacterId(0)
		})
	}

	return [isPending, del]
}

export function useRegisterSession(): [boolean, string, typeof register]
{
	const router = useRouter()
	const referrer = useReferrer()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const user = usePlayerUser()!

	function register(sessionName: string)
	{
		startTransition(async () =>
		{
			const session = filterErrors(await registerSession(user, sessionName), setErrorText)
			if (!session) return
			
			setErrorText("")
			router.push(referrer)
		})
	}

	return [isPending, errorText, register]
}

function filterErrors<T>(object: T | string, setErrorText: (text: string) => void)
{
	if (typeof object === "string")
	{
		setErrorText(object)
		return null
	}
	return object
}

export function RegistrationProvider({
	children,
}: {
	children: ReactNode,
})
{
	const [userId, setUserId] = useState<number | null>(null)
	const [characterId, setCharacterId] = useState<number | null>(null)

	useEffect(() => {(async () => setUserId(await getUserId()))()}, [])
	useEffect(() => {if (userId) (async () => setCharacterId(await getCharacterId(userId)))()}, [userId])

	return (
		<UserIdContext.Provider value={userId}>
			<SetUserIdContext.Provider value={setUserId}>
				<CharacterIdContext.Provider value={characterId}>
					<SetCharacterIdContext.Provider value={setCharacterId}>
						{children}
					</SetCharacterIdContext.Provider>
				</CharacterIdContext.Provider>
			</SetUserIdContext.Provider>
		</UserIdContext.Provider>
	)
}