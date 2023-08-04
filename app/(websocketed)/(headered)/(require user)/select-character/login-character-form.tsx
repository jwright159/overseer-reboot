"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { loginCharacter } from "@/lib/registration"
import { useReferrer } from "@/lib/referrer"
import { useCharactersOfUser } from "@/lib/context/character"
import { useUserId } from "@/lib/cookies"

export default function LoginCharacterForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const referrer = useReferrer()

	const characters = useCharactersOfUser(useUserId())

	return (characters !== null && characters.length ?
			<form onSubmit={event => {
				event.preventDefault()
				setErrorText("")

				const characterId = parseInt(event.currentTarget.characterId.value)

				startTransition(async () =>
				{
					const character = await loginCharacter(characterId)
					if (typeof character === "string")
					{
						setErrorText(character)
						return
					}

					router.push(referrer)
				})
			}}>
				{characters.map(character => (
					<p key={character.id}><input id={character.id.toString()} name="characterId" type="radio" value={character.id} disabled={isPending}/> <label htmlFor={character.id.toString()}>{character.entity!.name}</label></p>
				))}

				<input type="submit" value="Select" disabled={isPending}/>

				<p style={{ color: "red" }}>{errorText}</p>
			</form>
		: characters !== null ?
			<p>You have no characters!</p>
		:
			<p>Loading characters...</p>
	)
}