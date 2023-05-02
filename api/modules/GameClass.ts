import type { PrismaClient } from "@prisma/client";
import type Player from "./Player";
import { IGameInfos, GameStatus } from "../interfaces/GameInterfaces";
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

    private sequence(num: number): string[] {
        let res = []
        let i = 0
        while (i < num) {
            i++
            res.push(i.toString())
        }
        res.push("?")
        // res.push("☕")
        res.push("∞")
        return res
    }

    private fibonacci(num: number) {
        // x is representing the first term,
        // y is representing the second term, and
        // z is representing the sum of x and y.
        var answer: string[] = [];
        var x = 0;
        var y = 1;
        var z;

        // Since, the first two elements are fixed.
        // Storing the first two terms.
        answer.push(x.toString());
        // answer.push(y.toString());

        var i = 2;
        while (i < num) {
            z = x + y;
            x = y;
            y = z;

            // Storing the current element
            answer.push(z.toString());
            i = i + 1;
        }
        answer.push("?")
        // answer.push("☕")
        answer.push("∞")
        return answer;
    }
}