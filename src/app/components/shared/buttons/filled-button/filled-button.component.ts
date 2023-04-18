import { Component, Input } from '@angular/core';

@Component({
    selector: 'filled-button',
    templateUrl: './filled-button.component.html',
    styleUrls: ['./filled-button.component.scss']
})
export class FilledButton {
    @Input("color") color: string;
    @Input("hoverColor") hoverColor: string;
    @Input("href") href: string = '';
    hovering: boolean = false;
    constructor() {
        this.color = 'white';
        this.hoverColor = 'white';
    }


}
