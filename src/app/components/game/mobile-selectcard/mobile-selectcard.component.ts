import { Component, Input } from '@angular/core';
import { GameStatus, IGameInfos } from 'api/interfaces/GameInterfaces';
import GameController from 'src/controllers/GameController';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@Component({
  selector: 'mobile-selectcard',
  templateUrl: './mobile-selectcard.component.html',
  styleUrls: ['./mobile-selectcard.component.scss']
})
export class MobileSelectCardComponent {
  @Input('gameController')
  gameController?: GameController;

  gameStatus: typeof GameStatus = GameStatus
  currentCardIdx: number = 0

  NextCard() {
    if (this.gameController?.gameInfos?.cards) {
      if (this.currentCardIdx === this.gameController?.gameInfos?.cards.length - 1) {
        this.currentCardIdx = 0
      } else {
        this.currentCardIdx++
      }
    }
  }
  PreviousCard() {
    if (this.gameController?.gameInfos?.cards) {
      if (this.currentCardIdx === 0) {
        this.currentCardIdx = this.gameController?.gameInfos?.cards.length - 1
      } else {
        this.currentCardIdx--
      }
    }
  }

  GetCardNumber() {
    if (this.gameController?.gameInfos) {
      return this.gameController?.gameInfos?.cards[this.currentCardIdx]
    }
    return ''
  }
}
