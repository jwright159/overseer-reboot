"use server"

import { sealData, unsealData } from "iron-session"
import { cookies } from "next/headers"
import prisma from "./prisma"
import { Character, User } from "@prisma/client"

const cookieName = "OVERSEER_SESSION"
const cookiePassword = process.env.SESSION_PASSWORD as string // 32 character password from https://1password.com/password-generator/

interface CookieData
{
	userId?: number,
	password?: string,
	characterId?: number,
}

async function sealCookie(data: CookieData)
{
	const cookie = await sealData({
		...await unsealCookie(),
		...data,
	}, { password: cookiePassword })
	cookies().set(cookieName, cookie)
}

async function unsealCookie(): Promise<CookieData>
{
	const cookie = cookies().get(cookieName)
	if (!cookie) return {}

	const cookieData = await unsealData<CookieData>(cookie.value, { password: cookiePassword })
	if (!cookieData || typeof cookieData !== "object") return {}

	return cookieData
}

export async function getUser()
{
	const cookieData = await unsealCookie()
	if (!cookieData) return null

	const { userId, password } = cookieData

	if (!userId || typeof userId !== "number") return null
	if (!password || typeof password !== "string") return null

	const user = await prisma.user.findUnique({ where: { id: userId, password }, include: { characters: true } })

	return user
}

export async function setUser(user: User)
{
	await sealCookie({
		userId: user.id,
		password: user.password,
	})
}

export async function unsetUser()
{
	await sealCookie({
		userId: undefined,
		password: undefined,
	})
}

export async function getCharacter(user: User | null)
{
	if (!user) return null

	const cookieData = await unsealCookie()
	if (!cookieData) return null

	const { characterId } = cookieData

	if (!characterId || typeof characterId !== "number") return null

	const character = await prisma.character.findUnique({ where: { id: characterId } })

	if (!character || character.userId != user.id) return null

	return character
}

export async function setCharacter(character: Character)
{
	await sealCookie({
		characterId: character.id,
	})
}

export async function unsetCharacter()
{
	await sealCookie({
		characterId: undefined,
	})
}