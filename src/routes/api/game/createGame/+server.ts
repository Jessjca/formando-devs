import type { IGameInfos } from '$lib/interfaces/GameInterfaces'
import { PrismaClient } from '@prisma/client'
import type { RequestHandler } from '@sveltejs/kit'
const prisma = new PrismaClient()
export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json() as { userName: string, votingMethod: string }
    const gameInfos: IGameInfos = { votingMethod: data.votingMethod, status: 0, players: [], cards: [], actualTopic: undefined, actualVotes: [], rounds: [] }
    const game = await prisma.game.create({
        data: {
            infos: JSON.stringify(gameInfos),
        }
    })
    const responseData = { gameId: game.id }
    return new Response(JSON.stringify(responseData), { status: 200 })
}