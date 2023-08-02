import { createServer } from "http"
import { parse } from "url"
import next from "next"
import { Server } from "socket.io"

const dev = process.env.NODE_ENV !== "production"
const port = 3000

const app = next({ dev, port })
const handleNext = app.getRequestHandler()
app.prepare().then(() =>
{
	const httpServer = createServer()
		.once('error', (err) => {
			console.error(err)
			process.exit(1)
		})
	
	httpServer.on("request", async (req, res) => {
		try
		{
			const parsedUrl = parse(req.url!, true)
			
			if (parsedUrl.pathname !== '/ws')
				await handleNext(req, res, parsedUrl)
		}
		catch (err)
		{
			console.error('Error occurred handling', req.url, err)
			res.statusCode = 500
			res.end('internal server error')
		}
	})

	const io = new Server(httpServer)
	io.on("connection", socket =>
	{
		console.log("Connected")
	})

	httpServer.listen(port, () => {
		console.log(`> Ready on *:${port}`)
	})
})