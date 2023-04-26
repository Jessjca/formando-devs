import http from 'http'
import { Server, Socket } from "socket.io";
import WebSocketsEvents from './WebSocketsEvents';

export default class WebSocketsServer {
    private server: http.Server;
    private wss: Server | undefined;
    private events = new WebSocketsEvents();
    constructor(_server: http.Server) {
        this.server = _server;
    }

    StartServer() {
        this.wss = new Server(this.server, {
            cors: {
                origin: "http://localhost:4200",
                methods: ["GET", "POST"]
            }
        });
        this.server.listen(3000)
    }
    ListenMessages() {
        this.AssertWebSocketServer();
        this.wss!.on("connection", ws => {
            ws.emit("connected", { id: ws.id })
            ws.on("message", async (d) => this.events.OnMessage(d, ws))
            ws.on("disconnect", async () => this.events.OnDisconnect(ws))
        })
    }

    private AssertWebSocketServer() {
        if (!this.wss) {
            throw new Error("Deve ser Inicializado o servidor antes!")
        }
    }
}