"use server"

import { Character, Session, User } from "@prisma/client"
import { setCharacter, setUser } from "./cookies"
import prisma from "./prisma"
import bcrypt from "bcrypt"

export async function loginUser(username: string, password: string)
{
	const user = await prisma.user.findUnique({ where: { username } })
	if (!user) return "Wrong username or password"

	const passwordCorrect = await bcrypt.compare(password, user.password)
	if (!passwordCorrect) return "Wrong username or password"
	
	await setUser(user)
	return user
}

export async function registerUser(username: string, password: string)
{
	if (!username) return "Username cannot be empty"

	if (password.length < 8) return "Password must be at least 8 characters"

	const existingUser = await prisma.user.findUnique({ where: { username } })
	if (existingUser) return "Username taken"

	const passwordHash = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({ data: {
		username,
		password: passwordHash,
	}})
	if (!user) return "User could not be created"

	await setUser(user)
	return user
}

export async function loginCharacter(id: number)
{
	if (isNaN(id)) return "Must select a character"

	const character = await prisma.character.findUnique({ where: { id } })
	if (!character) return "No character with that ID"
	
	await setCharacter(character)
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
	if (!character) return "Character could not be created"

	const entity = await prisma.entity.create({ data: {
		name,
		team: { connect: { id: playerTeam.id } },
		character: { connect: { id: character.id } },
		owningCharacter: { connect: { id: character.id } },
	}})
	if (!entity) return "Character entity could not be created"

	await setCharacter(character)
	return character
}

export async function deleteCharacter(character: Character)
{
	const resCharacter = await prisma.character.delete({ where: { id: character.id } })
	if (!resCharacter) return "Character could not be deleted"

	return resCharacter
}

export async function getSession(name: string)
{
	if (!name) return "Name cannot be empty"

	const session = await prisma.session.findUnique({
		where: {
			name,
		},
	})
	if (!session) return "No session with that name"

	return session
}

export async function registerSession(user: User, name: string)
{
	if (!name) return "Name cannot be empty"

	const session = await prisma.session.create({ data: {
		admin: { connect: { id: user.id } },
		name,
	}})
	if (!session) return "Session could not be created"

	return session
}

export async function getPlayerTeam()
{
	let team = await prisma.team.findUnique({ where: { name: "Players" }})
	if (!team)
	{
		team = await prisma.team.create({ data: {
			name: "Players",
		}})
		if (!team) return "Player team could not be found or created"
	}
	
	return team
}