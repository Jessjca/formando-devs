import { Component, Input } from '@angular/core';
import GameController from 'src/controllers/GameController';

@Component({
  selector: 'app-game-topic-modal',
  templateUrl: './game-topic-modal.component.html',
  styleUrls: ['./game-topic-modal.component.scss']
})
export class GameTopicModal {
  show: boolean = false
  topic: string = ""

  @Input('gameController')
  gameController!: GameController

  UpdateTopic() {
    this.gameController.UpdateTopic(this.topic);
    this.show = false
  }

  toggle() {
    this.show = !this.show
  }
}
