import { PrismaClient } from '@prisma/client';
import { GameRequest, GameStatus, type IGameInfos } from "../lib/interfaces/GameInterfaces";
import { Server, Socket } from "socket.io";
import type { ViteDevServer } from "vite";
import GameClass from './GameClass';
import Player from './Player';
import WebSocketsEvents from './WebSocketsEvents';

export default class WebSocketsServer {
    private server: ViteDevServer;
    private wss: Server | undefined;
    private events = new WebSocketsEvents();
    constructor(_server: ViteDevServer) {
        this.server = _server;
    }

    StartServer() {
        this.wss = new Server(this.server.httpServer!);
    }
    ListenMessages() {
        this.AssertWebSocketServer();
        this.wss!.on("connection", ws => {
            ws.emit("connected")
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