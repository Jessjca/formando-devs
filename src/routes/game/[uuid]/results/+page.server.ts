import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'
import type { Load } from "@sveltejs/kit"
import { writableStore } from '$lib/stores/UserStore';
import { get } from 'svelte/store';
const prisma = new PrismaClient()
interface IPlayer {
    userName: string,
    owner: boolean,
}
interface IGameInfos {
    status: number,
    votingMethod: string,
    players: IPlayer[],
}
export const load: Load = async ({ params }) => {
    // Verificando se o jogo existe ou não
    const game = await prisma.game.findFirst({ where: { id: params.uuid } })
    if (!game) {
        throw error(404)
    }

    return {
        uuid: params.uuid,
    };
}