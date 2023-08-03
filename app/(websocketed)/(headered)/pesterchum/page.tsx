"use client"

import MainPanel from "@/app/components/main-panel"
import { useWebSocket } from "@/lib/websocket"
import { useEffect, useState } from "react"

interface Message {
	sender: string,
	text: string,
	id: number,
}

export default function Pesterchum()
{
	const socket = useWebSocket()

	const [username, setUsername] = useState("")
	const [messageText, setMessageText] = useState("")
	const [messages, setMessages] = useState<Message[]>([])

	useEffect(() =>
	{
		socket.on("send-message", (message: Message) => setMessages(messages => [...messages, message]))

		return () =>
		{
			socket.off("send-message")
		}
	}, [socket])

	function submitMessage()
	{
		if (!username || !messageText) return
		socket.emit("send-message", {sender: username, text: messageText})
		setMessageText("")
	}

	return (
		<MainPanel title="Pesterchum?">
			<div>
				<label htmlFor="username">Username: </label><input id="username" value={username} onChange={event => setUsername(event.currentTarget.value)}></input>
			</div>

			<div>
				<input
					value={messageText}
					onChange={event => setMessageText(event.currentTarget.value)}
					onKeyDown={event =>
					{
						if (event.key === "Enter")
						{
							event.preventDefault()
							submitMessage()
						}
					}}
				></input>
				<button onClick={submitMessage}>Send</button>
			</div>

			<ul>
				{messages.map(message => <li key={message.id}>{message.sender}: {message.text}</li>)}
			</ul>
		</MainPanel>
	)
}