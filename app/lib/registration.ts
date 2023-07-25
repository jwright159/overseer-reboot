"use server"

import { setUser } from "./auth"
import prisma from "./prisma"
import bcrypt from "bcrypt"

export async function loginUser(username: string, password: string)
{
	const user = await prisma.user.findUnique({ where: { username } })
	if (!user) throw new Error("Wrong username or password")

	const passwordCorrect = await bcrypt.compare(password, user.password)
	if (!passwordCorrect) throw new Error("Wrong username or password")
	
	await setUser(user)
}

export async function registerUser(username: string, password: string)
{
	if (password.length < 8) throw new Error("Password must be at least 8 characters")

	const existingUser = await prisma.user.findUnique({ where: { username } })
	if (existingUser) throw new Error("Username taken")

	const passwordHash = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({ data: {
		username,
		password: passwordHash,
	}})
	if (!user) throw new Error("User could not be created")

	await setUser(user)
}