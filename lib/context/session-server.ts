"use server"

import { User } from "@prisma/client"

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

	const existingSession = await prisma.session.findUnique({ where: { name } })
	if (existingSession) return "Name taken"

	const session = await prisma.session.create({ data: {
		admin: { connect: { id: user.id } },
		name,
	}})

	return session
}