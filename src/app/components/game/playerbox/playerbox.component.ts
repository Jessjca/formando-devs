import { Component, Input } from '@angular/core';
import { GameStatus } from 'api/interfaces/GameInterfaces';
import GameController from 'src/controllers/GameController';

@Component({
  selector: 'app-playerbox',
  templateUrl: './playerbox.component.html',
  styleUrls: ['./playerbox.component.scss']
})
export class PlayerboxComponent {
  @Input('gameController')
  gameController!: GameController;

  gameStatus: typeof GameStatus = GameStatus
}
