import { Component, Input, OnInit } from '@angular/core';
import { GameStatus } from 'api/interfaces/GameInterfaces';
import GameController from 'src/controllers/GameController';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input('gameController')
  gameController!: GameController;
  lowest = 0
  highest = 0
  average = 0
  ngOnInit() {
    this.lowest = this.gameController.gameInfos!.actualVotes.map((vote) => Number(vote.value))?.sort((a, b) => a - b)[0];
    this.highest = this.gameController.gameInfos!.actualVotes.map((vote) => Number(vote.value))?.sort((a, b) => b - a)[0];
    this.average = this.gameController.gameInfos!.actualVotes.map((vote) => Number(vote.value))?.reduce((a, b) => a + b, 0) / this.gameController.gameInfos!.actualVotes?.length;
  }



  gameStatus: typeof GameStatus = GameStatus
}
