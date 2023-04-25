import { Component, Input } from '@angular/core';
import { GameStatus } from 'api/interfaces/GameInterfaces';
import GameController from 'src/controllers/GameController';

@Component({
  selector: 'app-game-cronometer',
  templateUrl: './game-cronometer.component.html',
  styleUrls: ['./game-cronometer.component.scss']
})
export class GameCronometer {
  @Input("percentage")
  percentage!: number
  @Input('gameController')
  gameController!: GameController;

  IsOwner(): boolean {
    return this.gameController.gameInfos?.players!.find(p => p.owner === true)?.id === this.gameController?.game?.id
  }

  gameStatus: typeof GameStatus = GameStatus
}
