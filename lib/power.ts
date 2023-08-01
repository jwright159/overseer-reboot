"use server"

import { Entity } from "./context"
import prisma from "./prisma"

export async function changePower(entity: Entity, power: number)
{
	return (await prisma.entity.update({ where: { id: entity.id }, data: { power } })).power
}