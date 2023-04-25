import { Component, Input, OnInit } from '@angular/core';
import { GameStatus } from 'api/interfaces/GameInterfaces';
import GameController from 'src/controllers/GameController';

@Component({
    selector: 'owner-playerbox',
    templateUrl: './ownerplayerbox.component.html',
    styleUrls: ['./ownerplayerbox.component.scss']
})
export class OwnerPlayerBoxComponent {
    @Input('gameController')
    gameController!: GameController;

    gameStatus: typeof GameStatus = GameStatus
}
