"use client"

import MainPanel from "@/app/components/main-panel"
import { ChangeEvent, useEffect, useState } from "react"
import io from "socket.io-client"

export default function WSTest()
{
	const [wsValue, setWsValue] = useState("")
	const [onChange, setOnChange] = useState<(event: ChangeEvent<HTMLInputElement>) => void>(() => {})

	useEffect(() =>
	{
		const socket = io()
		socket.on("connect", () => console.log(`Connected ${socket.id}`))
		socket.on("disconnect", () => console.log(`Disconnected ${socket.id}`))

		socket.on("update-input", (input: string) => setWsValue(input))

		setOnChange(() => (event: ChangeEvent<HTMLInputElement>) =>
		{
			socket.emit("update-input", event.currentTarget.value)
			console.log("updating as " + socket.id)
		})

		return () => { socket.disconnect() }
	}, [])

	return (
		<MainPanel title="WebSocket test">
			<input value={wsValue} onChange={event => onChange(event)}></input>
		</MainPanel>
	)
}
