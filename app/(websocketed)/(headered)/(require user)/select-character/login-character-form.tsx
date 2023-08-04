"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { loginCharacter } from "@/lib/registration"
import { useReferrer } from "@/lib/referrer"
import { usePlayerUser } from "@/lib/context/user"
import { useCharacter } from "@/lib/context/character"
import { useEntity } from "@/lib/context/entity"

export default function LoginCharacterForm()
{
	const router = useRouter()

	const [errorText, setErrorText] = useState("")
	const [isPending, startTransition] = useTransition()

	const referrer = useReferrer()

	const user = usePlayerUser()!

	return (user.characterIds.length ?
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
				{user.characterIds.map(id => <CharacterEntry key={id} id={id} disabled={isPending}/>)}

				<input type="submit" value="Select" disabled={isPending}/>

				<p style={{ color: "red" }}>{errorText}</p>
			</form>
		:
			<p>You have no characters!</p>
	)
}

function CharacterEntry({
	id,
	disabled,
}: {
	id: number,
	disabled: boolean,
})
{
	const character = useCharacter(id)
	const entity = useEntity(character?.entityId ?? 0)

	return (character && entity ?
			<p><input id={id.toString()} name="characterId" type="radio" value={character.id} disabled={disabled}/> <label htmlFor={character.id.toString()}>{entity.name}</label></p>
		:
			<p>Loading character...</p>
	)
}