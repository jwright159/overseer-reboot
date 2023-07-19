"use server"

import { sealData, unsealData } from "iron-session"
import { cookies } from "next/headers"
import prisma from "./prisma"
import { User } from "@prisma/client"
import bcrypt from "bcrypt"

const cookieName = "OVERSEER_SESSION"
const cookiePassword = process.env.SESSION_PASSWORD as string // https://1password.com/password-generator/

export async function getUser()
{
	const cookie = cookies().get(cookieName)
	if (!cookie) return null

	const loginData = await unsealData(cookie.value, { password: cookiePassword })
	if (!loginData || typeof loginData !== "object") return null

	const { username, password } = loginData
	if (!username || typeof username !== "string") return null
	if (!password || typeof password !== "string") return null

	const user = await prisma.user.findUnique({ where: { username, password } })

	return user
}

export async function setUser(user: User)
{
	const cookie = await sealData({
		username: user.username,
		password: user.password,
	}, { password: cookiePassword })
	
	cookies().set(cookieName, cookie)
}

export async function unsetUser()
{
	cookies().delete(cookieName)
}

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