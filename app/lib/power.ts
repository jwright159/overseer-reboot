"use server"

import prisma from "./prisma"

export async function changePower(power: number)
{
	return (await prisma.user.update({ where: { id: 1 }, data: { power } })).power
}