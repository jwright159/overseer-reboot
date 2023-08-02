"use client"

import MainPanel from "@/app/components/main-panel"
import { useEffect, useState } from "react"
import io from "socket.io-client"

export default function WSTest()
{
	const [wsValue, setWsValue] = useState("")

	useEffect(() => void (async () =>
	{
		await fetch("/ws")
		const socket = io()
	})())

	return (
		<MainPanel title="WebSocket test">
			<input value={wsValue} onChange={event => setWsValue(event.currentTarget.value)}></input>
		</MainPanel>
	)
}