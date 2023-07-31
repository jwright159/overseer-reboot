"use client"

import { useRouter } from "next/navigation"
import { useContext, useState, useTransition } from "react"
import { ReferrerContext, UserContext } from "@/lib/context"
import { loginCharacter } from "@/lib/registration"

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
					<p key={character.id}><input id={character.id.toString()} name="characterId" type="radio" value={character.id} disabled={isPending}/> <label htmlFor={character.id.toString()}>{character.entity.name}</label></p>
				))}

				<input type="submit" value="Select" disabled={isPending}/>

				<p style={{ color: "red" }}>{errorText}</p>
			</form>
		:
			<p>You have no characters!</p>
	)
}