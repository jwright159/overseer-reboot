import { NextResponse } from "next/server"
import { setUser, unsetUser } from "../lib/auth"

export async function POST(request: Request)
{
	const userId: number | null = await request.json()
	if (userId !== null)
	{
		const did = await setUser(userId)
		return did ? new NextResponse() : new NextResponse(null, { status: 400 })
	}
	else
	{
		await unsetUser()
	}
}