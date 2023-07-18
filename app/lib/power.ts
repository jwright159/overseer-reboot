"use server"

import prisma from "./prisma"

export async function changePower(power: number)
{
	return (await prisma.sample.update({ where: { id: 1 }, data: { power } })).power
}