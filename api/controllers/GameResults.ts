import { Router, Request, Response } from 'express';
import { IGameInfos } from '../interfaces/GameInterfaces';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class GameResults {
    private route: Router
    constructor(_route: Router) {
        this.route = _route
        this.route.post('/game/getResults', async (req: Request, res: Response) => {
            const data = await req.body as { uuid: string }
            const game = await prisma.game.findFirst({ where: { id: data.uuid } })
            if (!game) {
                return res.status(404)
            }
            const gameInfos = JSON.parse(game?.infos) as IGameInfos
            const responseData = { votes: gameInfos.rounds }
            return res.status(200).send(JSON.stringify(responseData))
        })
    }
}