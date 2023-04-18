import { GameRequest, GameStatus, type IGameInfos, type IUserInfos } from "$lib/interfaces/GameInterfaces";
import { writableStore } from "$lib/stores/UserStore";
import { io, Socket } from 'socket.io-client';
import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import { get, writable } from "svelte/store";

class Game {
    private uuid: string
    private userName: string
    private socket: Socket | undefined;
    constructor(_uuid: string, _userName: string) {
        this.uuid = _uuid
        this.userName = _userName
    }

    private SendRequest(type: GameRequest, value: any) {
        const request = {
            status: type,
            values: {
                userName: this.userName,
                uuid: this.uuid,
                ...value
            }
        };
        this.socket?.send(request);
    }

    UpdateTopic(topic: string) {
        this.SendRequest(GameRequest.UpdateTopic, { topic })
    }
    SelectCard(card: string) {
        this.SendRequest(GameRequest.SelectCard, { card })
    }
    StartGame() {
        this.SendRequest(GameRequest.StartGame, {})
    }
    StartRound() {
        this.SendRequest(GameRequest.StartRound, {})
    }
    EndRound() {
        this.SendRequest(GameRequest.EndRound, {})
    }
    ShowResults() {
        this.SendRequest(GameRequest.ShowResults, {})
    }
    NewRound() {
        this.SendRequest(GameRequest.NewRound, {})
    }

    JoinHandler(OnGameUpdate: (msg: IGameInfos) => void) {
        this.socket = io();
        this.socket.on('connected', (message) => {
            // Request para verificar se o jogo começou
            const request = {
                status: 0,
                values: { userName: this.userName, uuid: this.uuid }
            };
            this.socket!.send(request);
        });
        this.socket.on('gameUpdate', (msg: IGameInfos) => {
            OnGameUpdate(msg)
        });
        return this.socket
    }
}

export default class GameController {
    gameInfos = writable<IGameInfos | undefined>(undefined)
    userInfos = writable<IUserInfos>({ roundRunning: false, width: 100 })
    uuid: string | undefined
    socket: Socket | undefined
    game: Game | undefined

    private intervalHandle: NodeJS.Timer | undefined
    private timeoutHandle: NodeJS.Timer | undefined

    OnMount() {
        this.CreateGame()
    }
    OnDefineUserName() {
    }

    SetUserName(userName: string, uuid: string) {
        writableStore.set({ userName, uuid })
        this.CreateGame()
    }

    UpdateTopic(topic: string) {
        this.game?.UpdateTopic(topic)
    }
    SelectCard(card: string) {
        this.userInfos.set({ roundRunning: false, width: get(this.userInfos).width })
        this.game?.SelectCard(card)
    }
    StartGame() {
        this.game?.StartGame()
    }
    StartRound() {
        this.game?.StartRound()
    }
    ShowResults() {
        this.game?.ShowResults()
    }
    NewRound() {
        this.game?.NewRound()
    }

    private CreateGame() {
        if (get(writableStore)) {
            this.uuid = get(writableStore)!.uuid
            this.game = new Game(get(writableStore)!.uuid, get(writableStore)!.userName)
            this.socket = this.game.JoinHandler(this.DelegateOnGameUpdate.bind(this))
        }
    }


    private DelegateOnGameUpdate(msg: IGameInfos) {
        this.gameInfos.set(msg);
        if (msg.status === GameStatus.RoundStarted) {
            this.userInfos.set({ roundRunning: true, width: 100 })
            this.intervalHandle = setInterval(() => {
                this.userInfos.set({ roundRunning: get(this.userInfos).roundRunning, width: get(this.userInfos).width - 100 / (30 * 1000 / 100) })
            }, 100);
            this.timeoutHandle = setTimeout(() => {
                this.userInfos.set({ roundRunning: false, width: 100 })
                clearInterval(this.intervalHandle);
                this.game?.EndRound()
            }, 30 * 1000);
        }
        if (msg.status === GameStatus.RoundEnded) {
            this.userInfos.set({ roundRunning: false, width: 100 })
            clearInterval(this.intervalHandle);
            clearTimeout(this.timeoutHandle)
        }
    }

}