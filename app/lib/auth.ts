"use server"

import { sealData, unsealData } from "iron-session"
import { cookies } from "next/headers"
import prisma from "./prisma"
import { User } from "@prisma/client"

const cookieName = "OVERSEER_SESSION"
const cookiePassword = process.env.SESSION_PASSWORD as string // https://1password.com/password-generator/

interface CookieData
{
	username?: string,
	password?: string,
	characterName?: string,
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

	const { username, password } = cookieData

	if (!username || typeof username !== "string") return null
	if (!password || typeof password !== "string") return null

	const user = await prisma.user.findUnique({ where: { username, password } })

	return user
}

export async function setUser(user: User)
{
	await sealCookie({
		username: user.username,
		password: user.password,
	})
}

export async function unsetUser()
{
	await sealCookie({
		username: undefined,
		password: undefined,
	})
}