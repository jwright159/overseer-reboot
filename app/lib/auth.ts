"use server"

import { sealData, unsealData } from "iron-session";
import { cookies } from "next/headers";
import prisma from "./prisma";

const cookieName = 'OVERSEER_SESSION'
const password = process.env.SESSION_PASSWORD as string // https://1password.com/password-generator/

export async function getUser()
{
	const cookie = cookies().get(cookieName)
	if (!cookie) return null

	const userId = await unsealData<number>(cookie.value, { password })
	if (typeof userId !== "number") return null

	const user = await prisma.sample.findUnique({ where: { id: userId } })

	return user
}

export async function setUser(userId: number)
{
	const user = await prisma.sample.findUnique({ where: { id: userId } })
	if (!user) return false

	const cookie = await sealData(userId, { password })

	cookies().set(cookieName, cookie)
	return true
}

export async function unsetUser()
{
	cookies().delete(cookieName)
}