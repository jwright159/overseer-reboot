"use server"

import { sealData, unsealData } from "iron-session"
import { cookies } from "next/headers"
import prisma from "./prisma"
import { Character, User } from "@prisma/client"
import { ReactNode } from "react"
import { RegistrationProvider } from "./registration"

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
	if (!cookiePassword) throw new Error("Session password not set")
	const cookie = await sealData({
		...await unsealCookie(),
		...data,
	}, {password: cookiePassword})
	cookies().set(cookieName, cookie)
}

async function unsealCookie(): Promise<CookieData>
{
	const cookie = cookies().get(cookieName)
	if (!cookie) return {}

	const cookieData = await unsealData<CookieData>(cookie.value, {password: cookiePassword})
	if (!cookieData || typeof cookieData !== "object") return {}

	return cookieData
}


export async function getUserId(): Promise<number>
{
	const cookieData = await unsealCookie()
	if (!cookieData) return 0

	const { userId, password } = cookieData

	if (!userId || typeof userId !== "number") return 0
	if (!password || typeof password !== "string") return 0

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
			password
		}
	})
	if (!user) return 0

	return userId
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


export async function getCharacterId(userId: number): Promise<number>
{
	if (!userId) return 0

	const cookieData = await unsealCookie()
	if (!cookieData) return 0

	const { characterId } = cookieData

	if (!characterId || typeof characterId !== "number") return 0

	const character = await prisma.character.findUnique({
		where: {
			id: characterId
		}
	})
	if (!character || character.userId != userId) return 0

	return characterId
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