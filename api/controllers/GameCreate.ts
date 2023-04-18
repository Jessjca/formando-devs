import { Router, Request, Response } from 'express';
import { IGameInfos } from '../interfaces/GameInterfaces';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class GameCreate {
    private route: Router
    constructor(_route: Router) {
        this.route = _route
        this.route.post('/game/createGame', async (req: Request, res: Response) => {
            const data = await req.body as { userName: string, votingMethod: string }
            const gameInfos: IGameInfos = { votingMethod: data.votingMethod, status: 0, players: [{ userName: data.userName, id: '', owner: true }], cards: [], actualTopic: undefined, actualVotes: [], rounds: [] }
            const game = await prisma.game.create({
                data: {
                    infos: JSON.stringify(gameInfos),
                }
            })
            const responseData = { game: game.id }
            return res.status(200).send(JSON.stringify(responseData))
        })
    }
}