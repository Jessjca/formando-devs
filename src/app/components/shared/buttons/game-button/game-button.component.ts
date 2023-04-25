import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.scss']
})
export class GameButton {
  @Input("color")
  color: string = "--rosinha"
  @Input("hoverColor")
  hoverColor: string = "--outro-rosa"

  isHovering: boolean = false

}
