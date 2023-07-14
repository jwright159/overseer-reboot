"use server"

import prisma from "../lib/prisma"

export async function changePower(power: number)
{
	return (await prisma.sample.update({ where: { id: 1 }, data: { power } })).power
}