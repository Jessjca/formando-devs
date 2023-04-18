import type { IGameInfos } from '$lib/interfaces/GameInterfaces'
import { PrismaClient } from '@prisma/client'
import type { RequestHandler } from '@sveltejs/kit'
const prisma = new PrismaClient()
export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json() as { uuid: string }
    const game = await prisma.game.findFirst({ where: { id: data.uuid } })
    const gameInfos = JSON.parse(game?.infos!) as IGameInfos
    const responseData = { results: gameInfos.rounds }
    return new Response(JSON.stringify(responseData), { status: 200 })
}