import { createServer } from "http"
import { parse } from "url"
import next from "next"
import { Server } from "socket.io"
import SetupWebSocket from "./websocket/websocket"

const dev = process.env.NODE_ENV !== "production"
const port = 3000

const app = next({ dev, port })
const handleNext = app.getRequestHandler()
app.prepare().then(() =>
{
	const httpServer = createServer()
	
	httpServer.on("request", (req, res) => {
		const parsedUrl = parse(req.url!, true)
		handleNext(req, res, parsedUrl)
	})

	const io = new Server(httpServer)
	io.on("connect", socket => SetupWebSocket(io, socket))

	httpServer.listen(port, () => {
		console.log(`> Ready on *:${port}`)
	})
})