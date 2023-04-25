import { GameRequest, IGameInfos, IUserInfos, GameStatus } from "api/interfaces/GameInterfaces";
import { io, Socket } from "socket.io-client";

class Game {
    private uuid: string
    private userName: string | undefined
    private socket: Socket | undefined;
    id: string | undefined
    constructor(_uuid: string, _userName: string | undefined) {
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
        this.socket = io("ws://localhost:3000")
        this.socket.on('connected', (message: { id: string }) => {
            this.id = message.id
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
    gameInfos: IGameInfos | undefined
    userInfos: IUserInfos = { roundRunning: false, width: 100 }
    uuid: string | undefined
    socket: Socket | undefined
    game: Game | undefined

    private intervalHandle: number | undefined
    private timeoutHandle: number | undefined

    OnMount() {
        // this.CreateGame()
    }
    OnDefineUserName() {
    }

    SetUserName(userName: string, uuid: string) {
        //writableStore.set({ userName, uuid })
        //this.CreateGame()
    }

    UpdateTopic(topic: string) {
        this.game?.UpdateTopic(topic)
    }
    SelectCard(card: string) {
        this.userInfos = { roundRunning: false, width: this.userInfos.width }
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

    CreateGame(data: { userName: string | undefined, uuid: string }) {
        this.uuid = data.uuid
        this.game = new Game(data.uuid, data.userName)
        this.socket = this.game.JoinHandler(this.DelegateOnGameUpdate.bind(this))
    }


    private DelegateOnGameUpdate(msg: IGameInfos) {
        this.gameInfos = msg
        if (msg.status === GameStatus.RoundStarted) {
            this.userInfos.roundRunning = true
            this.userInfos.width = 100
            this.intervalHandle = window.setInterval(() => {
                this.userInfos.width = this.userInfos.width - 100 / (30 * 1000 / 100)
            }, 100);
            this.timeoutHandle = window.setTimeout(() => {
                this.userInfos.roundRunning = false
                this.userInfos.width = 100
                clearInterval(this.intervalHandle);
                this.game?.EndRound()
            }, 30 * 1000);
        }
        if (msg.status === GameStatus.RoundEnded) {
            this.userInfos.roundRunning = false
            this.userInfos.width = 100
            clearInterval(this.intervalHandle);
            clearTimeout(this.timeoutHandle)
        }
    }

}