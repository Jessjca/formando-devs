import { Component, Input } from '@angular/core';
import { GameStatus } from 'api/interfaces/GameInterfaces';
import GameController from 'src/controllers/GameController';

@Component({
  selector: 'app-ownergamebox',
  templateUrl: './ownergamebox.component.html',
  styleUrls: ['./ownergamebox.component.scss']
})
export class OwnergameboxComponent {
  @Input('gameController')
  gameController!: GameController;

  showModal: boolean = false

  gameStatus: typeof GameStatus = GameStatus
}
