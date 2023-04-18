import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { GameRoutingModule } from "src/app/pages/game/game-routing.module";
import { CreateComponent } from "src/app/pages/game/create/create.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        GameRoutingModule,

    ], declarations: [
        CreateComponent
    ],
    exports: [
    ]
})
export class GameModule { }