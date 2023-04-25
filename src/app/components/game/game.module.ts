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
        GameboxComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        GameRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
})
export class GameModule { }
