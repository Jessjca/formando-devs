import { GameRequest, IGameInfos, IUserInfos, GameStatus } from "api/interfaces/GameInterfaces";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import GameController from 'src/controllers/GameController';

interface ISelectorOptions {
    name: string;
    value: string;
}

@Component({
    templateUrl: './game-room.component.html',
    styleUrls: ['./game-room.component.scss'],
})

export class GameRoomComponent implements OnInit {
    private route: ActivatedRoute
    uuid!: string;

    IsOwner(): boolean {
        return this.gameController.gameInfos?.players!.find(p => p.owner === true)?.id === this.gameController?.game?.id
    }

    gameController = new GameController()
    gameStatus: typeof GameStatus = GameStatus
    constructor(route: ActivatedRoute) {
        this.route = route
    }

    ngOnInit(): void {
        this.route.params.subscribe(value => this.uuid = value["uuid"]);
        this.gameController.CreateGame({ userName: undefined, uuid: this.uuid })
    }

}
