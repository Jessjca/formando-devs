import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    { path: 'game/create', component: CreateComponent },
    { path: 'game/:uuid', component: CreateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
