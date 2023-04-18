import express, { Router } from 'express'
import GameCreate from '../controllers/GameCreate';
import cors from 'cors';
import http from 'http'

export default class ExpressServer {
    private app
    server: http.Server
    route: Router
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app)
        this.app.use(express.json())
        this.app.use(cors({ origin: 'http://localhost:4200', }))
        this.route = Router()
        this.AddControllers()
        this.app.use('/api', this.route)
    }

    AddControllers() {
        new GameCreate(this.route)
    }
}