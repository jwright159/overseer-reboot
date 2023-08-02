import { Server, Socket } from "socket.io"

export default function SetupWebSocket(io: Server, socket: Socket)
{
	console.log(`Connected ${socket.id}`)

	socket.on("disconnect", () => console.log(`Disconnected ${socket.id}`))

	socket.on("update-input", input => io.emit("update-input", input))
}