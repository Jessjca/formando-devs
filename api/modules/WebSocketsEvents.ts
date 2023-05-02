import type { Socket } from "socket.io";
import GameClass from "./GameClass";
import Player from "./Player";
import { PrismaClient } from "@prisma/client";
import { IGameInfos, GameRequest, GameStatus } from "../interfaces/GameInterfaces";
const prisma = new PrismaClient()

interface IGame {
    id?: string,
    infos?: IGameInfos
}

export default class WebSocketsEvents {
    playersList: Player[] = []
    gamesList: GameClass[] = [];
    // Base Events
    async OnDisconnect(ws: Socket) {
        const id = this.playersList.find(player => player.socket === ws)?.gameId
        if (!id) {
            return
        }
        const game = await this.GetGame(id)
        game.infos.players = game.infos.players.filter(player => player.id !== ws.id)
        game.SaveData()
        this.EmitGameUpdateAllPlayers(game)
    }
    async OnMessage(data: { values: any, status: GameRequest }, ws: Socket) {
        switch (data.status) {
            case GameRequest.HandleJoin:
                return this.HandleJoin(data, ws)
            case GameRequest.StartGame:
                return this.StartGame(data, ws)
            case GameRequest.UpdateTopic:
                return this.UpdateTopic(data, ws)
            case GameRequest.StartRound:
                return this.StartRound(data, ws)
            case GameRequest.SelectCard:
                return this.SelectCard(data, ws)
            case GameRequest.EndRound:
                return this.EndRound(data, ws)
            case GameRequest.ShowResults:
                return this.ShowResults(data, ws)
            case GameRequest.NewRound:
                return this.NewRound(data, ws)
        }
    }

    // Game Events
    async HandleJoin(data: { values: { uuid: string, userName: string }, status: GameRequest }, ws: Socket) {
        const game = await this.GetGameInfos(data.values.uuid)
        if (!game.id) throw new Error("Jogo não existe!")
        if (game.infos === undefined) throw new Error("Jogo acabou")
        if (game.infos!.status === 0) {
            await this.CreateGame(game, ws, data.values.userName)
        } else {
            if (data.values.userName === undefined) return
            await this.JoinGame(game, ws, data.values.userName)
        }
    }

    private async NewRound(data: { values: { uuid: string, userName: string }, status: GameRequest }, ws: Socket) {
        const game = await this.GetGame(data.values.uuid)
        await game.ChangeStatus(GameStatus.ShowResults)


        game.infos.status = GameStatus.AwaitingRound
        game.infos.rounds.push({ topic: game.infos.actualTopic!, votes: game.infos.actualVotes })
        game.infos.actualTopic = undefined
        game.infos.actualVotes = []
        await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(game.infos) } })
        this.EmitGameUpdateAllPlayers(game)
    }

    private async ShowResults(data: { values: { uuid: string, userName: string }, status: GameRequest }, ws: Socket) {
        const game = await this.GetGame(data.values.uuid)
        await game.ChangeStatus(GameStatus.ShowResults)
        this.EmitGameUpdateAllPlayers(game)
    }

    private async SelectCard(data: { values: { uuid: string, userName: string, card: string }, status: GameRequest }, ws: Socket) {
        const game = await this.GetGame(data.values.uuid)

        game.infos.actualVotes.push({ id: ws.id, value: data.values.card, userName: game.infos.players.find(player=>player.id === ws.id) !.userName })
        if (game.infos.actualVotes.length === game.infos.players.length) {
            game.ChangeStatus(GameStatus.RoundEnded)
            this.EmitGameUpdateAllPlayers(game)
            return
        }
        game.ChangeStatus(GameStatus.CardSelected)

        this.EmitGameUpdateOwner(game)
    }

    private async EndRound(data: { values: { uuid: string, userName: string }, status: GameRequest }, ws: Socket) {
        const game = await this.GetGame(data.values.uuid)
        await game.ChangeStatus(GameStatus.RoundEnded)
        await game.infos.players.forEach((player, i) => {
            if (game.infos.actualVotes.filter(vote => vote.id === player.id).length === 0) {
                game.infos.actualVotes.push({ id: player.id, userName: player.userName, value: '?' })
            }
        })
        this.EmitGameUpdateAllPlayers(game)
        return
    }

    private async StartRound(data: { values: { uuid: string, userName: string }, status: GameRequest }, ws: Socket) {
        const game = await this.GetGame(data.values.uuid)
        game.ChangeStatus(GameStatus.RoundStarted)
        this.EmitGameUpdateAllPlayers(game)
    }

    private async UpdateTopic(data: { values: { uuid: string, userName: string, topic: string }, status: GameRequest }, ws: Socket) {
        const game = await this.GetGame(data.values.uuid)
        game.infos.actualTopic = data.values.topic
        await prisma.game.update({ where: { id: data.values.uuid }, data: { infos: JSON.stringify(game.infos) } })
        this.EmitGameUpdateOwner(game)
    }

    private async StartGame(data: { values: { uuid: string, userName: string }, status: GameRequest }, ws: Socket) {
        const game = await this.GetGame(data.values.uuid)
        game.ChangeStatus(GameStatus.AwaitingRound)
        this.EmitGameUpdateHiddenTopic(game)
    }

    private async JoinGame(game: IGame, ws: Socket, userName: string) {
        const newPlayer = new Player(game.id!, ws, false)
        this.playersList.push(newPlayer)
        const joinableGame = this.gamesList.find(gameList => gameList.id === game.id)
        joinableGame?.players.push(newPlayer)
        // TODO: Ajustar players em Game
        joinableGame!.infos.players.push({ id: ws.id, owner: false, userName: userName })
        joinableGame?.SaveData()
        this.EmitGameUpdateHiddenTopic(joinableGame!)
    }

    private async CreateGame(game: IGame, ws: Socket, userName: string) {
        const newPlayer = new Player(game.id!, ws, true)
        this.playersList.push(newPlayer)
        game.infos!.players[0].id = ws.id

        const newGame = new GameClass(game.id!, game.infos!, prisma)
        newGame.players.push(newPlayer)
        // TODO: Ajustar players em Game
        //newGame.infos.players.push({ id: ws.id, owner: true, userName: userName })
        this.gamesList.push(newGame)
        newGame.SaveData()
        ws.emit('gameUpdate', newGame.infos)
    }

    // Game Helper Methods
    private async GetGameInfos(gameId: string): Promise<IGame> {
        const gameModel = await prisma.game.findFirst({ where: { id: gameId } })
        const gameInfos = JSON.parse(gameModel?.infos as string) as IGameInfos
        const game: IGame = {
            id: gameModel?.id,
            infos: gameInfos
        };
        return game
    }
    private EmitGameUpdateAllPlayers(game: IGame) {
        this.playersList.filter(player => player.gameId === game.id!).forEach(player => {
            player.socket.emit('gameUpdate', game.infos)
        })
    }
    private EmitGameUpdateOwner(game: IGame) {
        this.playersList.filter(player => player.gameId === game.id!).find(player => player.owner === true)?.socket.emit('gameUpdate', game.infos)
    }
    private EmitGameUpdateHiddenTopic(game: IGame) {
        this.playersList.filter(player => player.gameId === game.id!).forEach(player => {
            const infosCopy = game.infos!
            if (!player.owner) {
                infosCopy.actualTopic = undefined
            }
            player.socket.emit('gameUpdate', infosCopy)
        })
    }
    private async GetGame(gameId: string) {
        const game = this.gamesList.find(game => game.id === gameId)
        if (!game) throw new Error("O jogo não existe")
        return game
    }
}