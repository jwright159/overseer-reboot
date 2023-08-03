"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useUser } from "@/lib/context"
import { loginCharacter } from "@/lib/registration"
import { useReferrer } from "@/lib/referrer"

export default function LoginCharacterForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const referrer = useReferrer()

	const user = useUser()

	return (user.characters.length ?
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
				{user.characters.map(character => (
					<p key={character.id}><input id={character.id.toString()} name="characterId" type="radio" value={character.id} disabled={isPending}/> <label htmlFor={character.id.toString()}>{character.entity!.name}</label></p>
				))}

				<input type="submit" value="Select" disabled={isPending}/>

				<p style={{ color: "red" }}>{errorText}</p>
			</form>
		:
			<p>You have no characters!</p>
	)
}