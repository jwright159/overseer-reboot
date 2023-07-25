"use client"

import { useRouter } from "next/navigation"
import { useContext, useState, useTransition } from "react"
import { ReferrerContext, UserContext } from "@/app/lib/context"
import { loginCharacter } from "@/app/lib/registration"

export default function LoginCharacterForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const referrer = useContext(ReferrerContext)

	const user = useContext(UserContext)!

	return (user.characters.length ?
			<form onSubmit={event => {
				event.preventDefault()
				setErrorText("")

				const characterId = parseInt(event.currentTarget.characterId.value)

				startTransition(async () =>
				{
					try
					{
						await loginCharacter(characterId)
						router.push(referrer)
					}
					catch (error)
					{
						setErrorText((error as Error).message)
					}
				})
			}}>
				{user.characters.map(character => (
					<p key={character.id}><input id={character.id.toString()} name="characterId" type="radio" value={character.id} disabled={isPending}/> <label htmlFor={character.id.toString()}>{character.name}</label></p>
				))}

				<input type="submit" value="Select" disabled={isPending}/>

				<p style={{ color: "red" }}>{errorText}</p>
			</form>
		:
			<p>You have no characters!</p>
	)
}