import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilledButton } from './buttons/filled-button/filled-button.component';
import { FloatingButton } from './buttons/floating-button/floating-button.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownSelector } from './inputs/dropdown-selector/dropdown-selector.component';
import { GameButton } from './buttons/game-button/game-button.component';
import { GameCronometer } from './buttons/game-cronometer/game-cronometer.component';
import { ShareButton } from './buttons/share-button/share-button.component';
import { FormsModule } from '@angular/forms';
import { FilledButtonNoHref } from './buttons/filled-button-no-href/filled-button-no-href.component';


@NgModule({
    declarations: [
        FilledButton,
        FilledButtonNoHref,
        FloatingButton,
        GameButton,
        GameCronometer,
        ShareButton,
        HeaderComponent,
        FooterComponent,
        DropdownSelector,
    ],
    exports: [
        FilledButton,
        FilledButtonNoHref,
        FloatingButton,
        GameButton,
        GameCronometer,
        ShareButton,
        HeaderComponent,
        FooterComponent,
        DropdownSelector,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
    ]
})
export class SharedModule { }
