import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { GameRoomComponent } from 'src/app/components/game/room/game-room.component';
import { ResultsPageComponent } from './results/results.component';

const routes: Routes = [
    { path: 'game/create', component: CreateComponent },
    { path: 'game/:uuid', component: GameRoomComponent },
    { path: 'game/:uuid/results', component: ResultsPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
