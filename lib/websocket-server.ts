import { Server, Socket } from "socket.io"
import prisma from "./prisma"
import { Character, Entity } from "@prisma/client"

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

	createSubscription(io, socket, "user", prisma.user)
	createSubscription(io, socket, "character", prisma.character)
	createSubscription(io, socket, "entity", prisma.entity)

	socket.on("fetch-characters-of-user", async (userId: number, setCharacters: (characters: (Character & {entity: Entity})[]) => void) =>
	{
		const characters = await prisma.character.findMany({
			where: {
				user: {id: userId},
			},
			include: {
				entity: true,
			},
		})
		setCharacters([...characters.map(character => ({...character, entity: character.entity!}))])
	})
}

function createSubscription<T extends {id: number}>(io: Server, socket: Socket, table: string, model: {
	findUnique: (args: {where: {id: number}}) => Promise<T | null>,
	update: (args: {where: {id: number}, data: T}) => Promise<T>,
})
{
	const listeners: Record<number, number> = {}

	socket.on(`subscribe-${table}`, async (id: number) =>
	{
		listeners[id] = (listeners[id] ?? 0) + 1
		if (listeners[id] === 1) socket.join(`update-${table}-${id}`)
		socket.emit(`update-${table}`, await model.findUnique({where: {id}}))
	})

	socket.on(`unsubscribe-${table}`, (id: number) =>
	{
		listeners[id] = Math.max((listeners[id] ?? 0) - 1, 0)
		if (listeners[id] === 0) socket.leave(`update-${table}-${id}`)
	})

	socket.on(`update-${table}`, async (value: T, callback: () => void) =>
	{
		const newValue = await model.update({where: {id: value.id}, data: value})
		io.in(`update-${table}-${value.id}`).emit(`update-${table}`, newValue)
		callback()
	})
}