import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameRoomComponent } from './room/game-room.component';
import { HttpClientModule } from '@angular/common/http';
import { YellowboxComponent } from './yellowbox/yellowbox.component';
import { YellowseparatorComponent } from './yellowseparator/yellowseparator.component';
import { OwnerPlayerBoxComponent } from './ownerplayerbox/ownerplayerbox.component';
import { OwnergameboxComponent } from './ownergamebox/ownergamebox.component';
import { CardComponent } from './card/card.component';
import { ResultsComponent } from './results/results.component';
import { UsernameSelectorComponent } from './username-selector/username-selector.component';
import { PlayerboxComponent } from './playerbox/playerbox.component';
import { GameboxComponent } from './gamebox/gamebox.component';
import { SharedModule } from '../shared/shared.module';
import { GameRoutingModule } from 'src/app/pages/game/game-routing.module';
import { CreateComponent } from 'src/app/pages/game/create/create.component';
import { MobileSelectCardComponent } from './mobile-selectcard/mobile-selectcard.component';
import { GameTopicModal } from './game-topic-modal/game-topic-modal.component';
import { ResultsPageComponent } from 'src/app/pages/game/results/results.component';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

export class MyHammerConfig extends HammerGestureConfig {
    override overrides = <any>{
        swipe: { direction: Hammer.DIRECTION_ALL },
    };
}

@NgModule({
    declarations: [
        GameComponent,
        CreateComponent,
        GameRoomComponent,
        YellowboxComponent,
        YellowseparatorComponent,
        OwnerPlayerBoxComponent,
        OwnergameboxComponent,
        CardComponent,
        ResultsComponent,
        UsernameSelectorComponent,
        PlayerboxComponent,
        GameboxComponent,
        MobileSelectCardComponent,
        GameTopicModal,
        ResultsPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        GameRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
    exports: [
        YellowboxComponent,
        YellowseparatorComponent
    ],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig,
        },
    ],
})
export class GameModule { }
