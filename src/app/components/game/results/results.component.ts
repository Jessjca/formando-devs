import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  fontSize = window.innerWidth < 800 ? 9 : 2

  NumberParser(character: string) {
    if (character === "☕") {
      return -200
    } else if (character === "∞") {
      return 200
    } else if (character === "?") {
      return 0
    }
    return Number(character)
  }

  GetValue(number: number): string {
    /*if (number < -100) {
     return "☕"
   }*/         // TODO: Ajustar a opção de café

    if (number > 100) {
      return "∞"
    }
    if (number < 2 && number > -2) {
      return "?"
    }
    return number.toFixed(0).toString()
  }

  ngOnInit() {
    this.lowest = this.gameController.gameInfos!.actualVotes.map((vote) => this.NumberParser(vote.value))?.sort((a, b) => a - b)[0];
    this.highest = this.gameController.gameInfos!.actualVotes.map((vote) => this.NumberParser(vote.value))?.sort((a, b) => b - a)[0];
    this.average = this.gameController.gameInfos!.actualVotes.map((vote) => this.NumberParser(vote.value))?.reduce((a, b) => a + b, 0) / this.gameController.gameInfos!.actualVotes?.length;
  }



  gameStatus: typeof GameStatus = GameStatus
}
