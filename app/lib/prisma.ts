import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production')
{
	dotenv.config({ path: 'prisma/.env.prod' })
	prisma = new PrismaClient()
}
else
{
	if (!global.prisma)
	{
		dotenv.config({ path: 'prisma/.env.dev' })
		global.prisma = new PrismaClient()
	}
	
	prisma = global.prisma
}

export default prisma