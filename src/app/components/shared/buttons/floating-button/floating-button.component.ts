import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'floating-button',
    templateUrl: './floating-button.component.html',
})
export class FloatingButton {
    @Input('href')
    href: string = ''
    @Output() click = new EventEmitter();
}
