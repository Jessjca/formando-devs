import { Component, Input } from '@angular/core';
import { GameStatus } from 'api/interfaces/GameInterfaces';
import GameController from 'src/controllers/GameController';

@Component({
  selector: 'app-gamebox',
  templateUrl: './gamebox.component.html',
  styleUrls: ['./gamebox.component.scss']
})
export class GameboxComponent {
  @Input('gameController')
  gameController!: GameController;

  gameStatus: typeof GameStatus = GameStatus
}
