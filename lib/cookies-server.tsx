"use server"

import { sealData, unsealData } from "iron-session"
import { cookies } from "next/headers"

const cookieName = "OVERSEER_SESSION"
const cookiePassword = process.env.SESSION_PASSWORD as string // 32 character password from https://1password.com/password-generator/

interface CookieData
{
	userId?: number,
	password?: string,
	characterId?: number,
}

export async function sealCookie(data: CookieData)
{
	if (!cookiePassword) throw new Error("Session password not set")
	const cookie = await sealData({
		...await unsealCookie(),
		...data,
	}, {password: cookiePassword})
	cookies().set(cookieName, cookie)
}

export async function unsealCookie(): Promise<CookieData>
{
	const cookie = cookies().get(cookieName)
	if (!cookie) return {}

	const cookieData = await unsealData<CookieData>(cookie.value, {password: cookiePassword})
	if (!cookieData || typeof cookieData !== "object") return {}

	return cookieData
}