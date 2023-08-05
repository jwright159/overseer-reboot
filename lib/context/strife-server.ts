"use server"

import { Character } from "@prisma/client"
import prisma from "../prisma"
import { getUnderlingTeam } from "./team-server"

export async function startStrife(character: Character)
{
	const team = await getUnderlingTeam()
	if (typeof team === "string") return team

	const imp = await prisma.entity.create({ data: {
		owningCharacter: { connect: { id: character.id }},
		team: { connect: { id: team.id }},
		name: "Imp",
		power: 5,
	}})

	const strife = await prisma.strife.create({ data: {
		entities: { connect: [
			{ id: character.entityId! },
			{ id: imp.id },
		]},
		ownedEntities: { connect: [
			{ id: imp.id },
		]},
		owningCharacter: { connect: { id: character.id }},
	}})

	return strife
}