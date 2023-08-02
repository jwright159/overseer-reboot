import { Server, Socket } from "socket.io"

let messageId = 0

export default function SetupWebSocket(io: Server, socket: Socket)
{
	console.log(`Connected ${socket.id}`)

	socket.on("disconnect", () => console.log(`Disconnected ${socket.id}`))

	socket.on("send-message", message => io.emit("send-message", {...message, id: messageId++}))
}