import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilledButton } from './buttons/filled-button/filled-button.component';
import { FloatingButton } from './buttons/floating-button/floating-button.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        FilledButton,
        FloatingButton
    ],
    exports: [

    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
