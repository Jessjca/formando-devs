import { Component, Input } from '@angular/core';
import { GameStatus, IGameInfos } from 'api/interfaces/GameInterfaces';
import GameController from 'src/controllers/GameController';

@Component({
  selector: 'mobile-selectcard',
  templateUrl: './mobile-selectcard.component.html',
  styleUrls: ['./mobile-selectcard.component.scss']
})
export class MobileSelectCardComponent {
  @Input('gameController')
  gameController?: GameController;

  gameStatus: typeof GameStatus = GameStatus
  actualCard: string = this.gameController?.gameInfos?.cards[0]?.toString() ? this.gameController?.gameInfos?.cards[0]?.toString() : ''
  actualCardIdx: number = 0

  NextCard() {
    if (this.gameController?.gameInfos?.cards) {
      if (this.actualCardIdx === this.gameController?.gameInfos?.cards.length - 1) {
        this.actualCardIdx = 0
      } else {
        this.actualCardIdx++
      }
      this.actualCard = this.gameController?.gameInfos?.cards[this.actualCardIdx]?.toString()
    }
  }
  PreviousCard() {
    if (this.gameController?.gameInfos?.cards) {
      if (this.actualCardIdx === 0) {
        this.actualCardIdx = this.gameController?.gameInfos?.cards.length - 1
      } else {
        this.actualCardIdx--
      }
      this.actualCard = this.gameController?.gameInfos?.cards[this.actualCardIdx]?.toString()
    }
  }
}
