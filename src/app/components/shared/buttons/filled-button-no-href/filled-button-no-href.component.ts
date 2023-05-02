import { Component, Input } from '@angular/core';

@Component({
    selector: 'filled-button-no-href',
    templateUrl: './filled-button-no-href.component.html',
    styleUrls: ['./filled-button-no-href.component.scss']
})
export class FilledButtonNoHref {
    @Input("color") color: string;
    @Input("hoverColor") hoverColor: string;
    hovering: boolean = false;
    constructor() {
        this.color = 'white';
        this.hoverColor = 'white';
    }


}
