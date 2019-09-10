import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ROUTES } from "./routes";

const routes: Routes = [
    { path: "", redirectTo: ROUTES.TASK, pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule {
}