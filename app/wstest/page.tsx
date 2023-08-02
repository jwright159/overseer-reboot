"use client"

import MainPanel from "@/app/components/main-panel"
import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"

interface Message {
	sender: string,
	text: string,
	id: number,
}

export default function WSTest()
{
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() =>
	{
		const socket = io()
		setSocket(socket)
		socket.on("connect", () => console.log(`Connected ${socket.id}`))
		socket.on("disconnect", () => console.log(`Disconnected ${socket.id}`))
	}, [])

	return socket ? <Messager socket={socket}/> : <p>Connecting...</p>
}

function Messager({
	socket,
}: {
	socket: Socket,
})
{
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

	return (
		<MainPanel title="WebSocket test">
			<div>
				<label htmlFor="username">Username: </label><input id="username" value={username} onChange={event => setUsername(event.currentTarget.value)}></input>
			</div>

			<div>
				<input value={messageText} onChange={event => setMessageText(event.currentTarget.value)}></input>
				<button onClick={() =>
				{
					if (!username || !messageText) return
					socket.emit("send-message", {sender: username, text: messageText})
					setMessageText("")
				}}>Send</button>
			</div>

			<ul>
				{messages.map(message => <li key={message.id}>{message.sender}: {message.text}</li>)}
			</ul>
		</MainPanel>
	)
}