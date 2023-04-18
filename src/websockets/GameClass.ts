import type { PrismaClient } from "@prisma/client";
import { type IGameInfos, GameStatus } from "../lib/interfaces/GameInterfaces";
import type Player from "./Player";
export default class GameClass {
    id: string
    infos: IGameInfos;
    prisma: PrismaClient;
    players: Player[] = [];

    constructor(_id: string, _infos: IGameInfos, _prisma: PrismaClient) {
        this.prisma = _prisma
        this.id = _id
        this.infos = _infos
        this.GenerateCards()
        this.infos.status = GameStatus.AwaitingPlayers
    }

    async ChangeStatus(status: GameStatus) {
        this.infos.status = status
        await this.SaveData()
    }
    async SaveData() {
        await this.prisma.game.update({ where: { id: this.id }, data: { infos: JSON.stringify(this.infos) } })
    }


    private GenerateCards() {
        switch (this.infos.votingMethod) {
            case "fibonacci":
                this.infos.cards = this.fibonacci(12)
                break;
            case "sequencia":
                this.infos.cards = this.sequence(12)
                break;
        }
    }

    private sequence(num: number): number[] {
        let res = []
        let i = 0
        while (i < num) {
            i++
            res.push(i)
        }
        return res
    }

    private fibonacci(num: number) {
        // x is representing the first term,
        // y is representing the second term, and
        // z is representing the sum of x and y.
        var answer = [];
        var x = 0;
        var y = 1;
        var z;

        // Since, the first two elements are fixed.
        // Storing the first two terms.
        answer.push(x);
        answer.push(y);

        var i = 2;
        while (i < num) {
            z = x + y;
            x = y;
            y = z;

            // Storing the current element
            answer.push(z);
            i = i + 1;
        }
        return answer;
    }
}