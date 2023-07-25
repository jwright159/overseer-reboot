"use server"

import { Character } from "@prisma/client"
import prisma from "./prisma"

export async function changePower(charcter: Character, power: number)
{
	return (await prisma.character.update({ where: { id: charcter.id }, data: { power } })).power
}