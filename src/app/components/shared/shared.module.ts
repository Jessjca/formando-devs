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
import { GameTopicModal } from './modals/game-topic-modal/game-topic-modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        FilledButton,
        FloatingButton,
        GameButton,
        GameCronometer,
        ShareButton,
        HeaderComponent,
        FooterComponent,
        DropdownSelector,
        GameTopicModal
    ],
    exports: [
        FilledButton,
        FloatingButton,
        GameButton,
        GameCronometer,
        ShareButton,
        HeaderComponent,
        FooterComponent,
        DropdownSelector,
        GameTopicModal
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ]
})
export class SharedModule { }
