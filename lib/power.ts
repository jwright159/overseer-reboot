"use server"

import { Entity } from "@prisma/client"
import prisma from "./prisma"

export async function changePower(entity: Entity, power: number)
{
	return (await prisma.entity.update({ where: { id: entity.id }, data: { power } })).power
}