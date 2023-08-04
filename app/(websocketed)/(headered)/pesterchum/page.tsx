"use client"

import MainPanel from "@/components/main-panel"
import { usePlayerUser } from "@/lib/context-2/player-user"
import { useWebSocket } from "@/lib/websocket"
import { useEffect, useState } from "react"

export default function Pesterchum()
{
	const socket = useWebSocket()

	const user = usePlayerUser()

	const [messageText, setMessageText] = useState("")
	const [messages, setMessages] = useState<{id: number, text: string}[]>([])

	const recieveMessage = (message: any) => setMessages(messages => [...messages, {id: message.id, text: `[${message.sender}] ${message.text}`}])
	const recieveJoin = (message: any) => setMessages(messages => [...messages, {id: message.id, text: `--- ${message.sender} joined the chat! ---`}])
	const recieveLeave = (message: any) => setMessages(messages => [...messages, {id: message.id, text: `--- ${message.sender} left the chat! ---`}])

	useEffect(() =>
	{
		if (!user) return

		socket.on("send-message", recieveMessage)
		socket.on("join-chat", recieveJoin)
		socket.on("leave-chat", recieveLeave)
		socket.emit("join-chat", user.username)

		return () =>
		{
			socket.emit("leave-chat")
			socket.off("send-message", recieveMessage)
			socket.off("join-chat", recieveJoin)
			socket.off("leave-chat", recieveLeave)
		}
	}, [socket, user])

	function submitMessage()
	{
		if (!user || !messageText) return
		socket.emit("send-message", {sender: user.username, text: messageText})
		setMessageText("")
	}

	return (
		<MainPanel title="Pesterchum?">
			{user ? <p>Logged in as {user.username}</p> : <p>Logging in...</p>}

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
				{messages.map(message => <li key={message.id}>{message.text}</li>)}
			</ul>
		</MainPanel>
	)
}