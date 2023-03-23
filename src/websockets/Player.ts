import type { Socket } from "socket.io";

export default class Player {
    gameId: string;
    socket: Socket;
    owner: boolean;

    constructor(_gameId: string, _socket: Socket, _owner: boolean) {
        this.gameId = _gameId
        this.socket = _socket
        this.owner = _owner
    }
}