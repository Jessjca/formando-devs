import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'floating-button',
    templateUrl: './floating-button.component.html',
})
export class FloatingButton {
    @Input('href')
    href: string = ''
    @Input('fragment')
    fragment?: ElementRef

    Scroll() {
        if (this.fragment) {
            console.log(this.fragment!.nativeElement)
        }
    }
}
