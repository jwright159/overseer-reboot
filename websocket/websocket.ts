import { Server, Socket } from "socket.io"
import prisma from "../lib/prisma"
import { createSubscriptionFromModelIncludingIds, createSubscriptionFromModel } from "./model-subscriptions"

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

	createSubscriptionFromModelIncludingIds(io, socket, prisma, "user", {characters: "characterIds"})
	createSubscriptionFromModel(io, socket, prisma, "character")
	createSubscriptionFromModel(io, socket, prisma, "entity")
	createSubscriptionFromModelIncludingIds(io, socket, prisma, "strife", {entities: "entityIds"})
}
