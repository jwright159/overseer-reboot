"use server"

import prisma from "../prisma"

export async function getPlayerTeam()
{
	let team = await prisma.team.upsert({
		create: { name: "Players" },
		update: {},
		where: { name: "Players" },
	})
	if (!team) return "Player team could not be found or created"
	
	return team
}

export async function getUnderlingTeam()
{
	let team = await prisma.team.upsert({
		create: { name: "Underlings" },
		update: {},
		where: { name: "Underlings" },
	})
	if (!team) return "Underlings team could not be found or created"
	
	return team
}