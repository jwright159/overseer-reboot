"use client"

import { unsetUser } from "@/lib/cookies"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export default function LogoutButton()
{
	const router = useRouter()

	const [isPending, startTransition] = useTransition()

	return <button onClick={() => startTransition(() => unsetUser().then(router.refresh))} disabled={isPending}>Logout</button>
}