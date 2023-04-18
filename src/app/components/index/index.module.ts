import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { IndexComponent } from "src/app/pages/index/index.component";
import { IndexDescription } from "./index-description/indexdescription.component";
import { IndexExplanation } from "./index-explanation/index-explanation.component";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,

    ], declarations: [
        IndexComponent,
        IndexDescription,
        IndexExplanation,
    ],
    exports: [
        IndexComponent,
    ]
})
export class IndexModule { }