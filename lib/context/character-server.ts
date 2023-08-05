"use server"

import { User, Session } from "@prisma/client"
import { getPlayerTeam } from "./team-server"

export async function loginCharacter(id: number)
{
	if (isNaN(id)) return "Must select a character"

	const character = await prisma.character.findUnique({ where: { id } })
	if (!character) return "No character with that ID"
	
	return character
}

export async function registerCharacter(user: User, session: Session, name: string)
{
	if (!name) return "Name cannot be empty"

	const playerTeam = await getPlayerTeam()
	if (typeof playerTeam === "string") return playerTeam

	const character = await prisma.character.create({ data: {
		user: { connect: { id: user.id } },
		session: { connect: { id: session.id } },
	}})

	await prisma.entity.create({ data: {
		name,
		team: { connect: { id: playerTeam.id } },
		character: { connect: { id: character.id } },
		owningCharacter: { connect: { id: character.id } },
	}})

	return character
}

export async function deleteCharacter(id: number)
{
	const resCharacter = await prisma.character.delete({where: {id}})
	return resCharacter
}