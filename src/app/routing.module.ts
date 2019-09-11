import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ROUTES } from "./routes";
import { AppComponent } from "./app.component";
import { AddTaskComponent } from "./task-add/task-add.component";

const routes: Routes = [
    { path: ROUTES.TASK, component: AppComponent,
        children: [
            { path: "", redirectTo: ROUTES.VIEWTASK, pathMatch: "full" },
            { path: ROUTES.ADDTASK, component: AddTaskComponent },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule {
}