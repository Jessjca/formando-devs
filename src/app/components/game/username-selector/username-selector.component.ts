import { Component, Input } from '@angular/core';
import GameController from 'src/controllers/GameController';

@Component({
  selector: 'app-username-selector',
  templateUrl: './username-selector.component.html',
  styleUrls: ['./username-selector.component.scss']
})
export class UsernameSelectorComponent {
  @Input('gameController')
  gameController!: GameController;
  @Input('uuid')
  uuid!: string;

  userName: string = ""

  CreateGame() {
    this.gameController.CreateGame({ userName: this.userName, uuid: this.uuid })
  }
}
