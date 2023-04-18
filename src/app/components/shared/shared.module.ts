import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilledButton } from './buttons/filled-button/filled-button.component';
import { FloatingButton } from './buttons/floating-button/floating-button.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownSelector } from './inputs/dropdown-selector/dropdown-selector.component';



@NgModule({
    declarations: [
        FilledButton,
        FloatingButton,
        HeaderComponent,
        FooterComponent,
        DropdownSelector
    ],
    exports: [
        FilledButton,
        FloatingButton,
        HeaderComponent,
        FooterComponent,
        DropdownSelector
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
