import { Server, Socket } from "socket.io"
import prisma from "./prisma"

let messageId = 0

export default function SetupWebSocket(io: Server, socket: Socket)
{
	console.log(`Connected ${socket.id}`)

	socket.on("disconnect", () => console.log(`Disconnected ${socket.id}`))

	let username = ""
	let isInChat = false
	socket.on("send-message", message => io.in("chat").emit("send-message", {...message, id: messageId++}))
	socket.on("join-chat", user =>
	{
		if (isInChat) return
		username = user
		isInChat = true
		socket.join("chat")
		io.in("chat").emit("join-chat", {sender: username, id: messageId++})
	})
	socket.on("leave-chat", () =>
	{
		if (!isInChat) return
		isInChat = false
		io.in("chat").emit("leave-chat", {sender: username, id: messageId++})
		socket.leave("chat")
	})
	socket.on("disconnect", () =>
	{
		if (isInChat) io.in("chat").emit("leave-chat", {sender: username, id: messageId++})
	})

	const userListeners: Record<number, number> = {}
	socket.on("subscribe-user", async id =>
	{
		userListeners[id] = (userListeners[id] ?? 0) + 1
		socket.emit("update-user", await prisma.user.findUnique({where: {id}}))
	})
	socket.on("unsubscribe-user", id =>
	{
		userListeners[id] = Math.max((userListeners[id] ?? 0) - 1, 0)
	})
}