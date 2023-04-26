import ExpressServer from "./modules/ExpressServer";
import WebSocketsServer from "./modules/WebSocketsServer";

const expressServer = new ExpressServer()

const wss = new WebSocketsServer(expressServer.server)
wss.StartServer()
wss.ListenMessages()