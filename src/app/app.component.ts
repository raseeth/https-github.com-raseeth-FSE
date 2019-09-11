import { Component } from '@angular/core';

import { ROUTES } from "./routes";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(private router: Router, private route: ActivatedRoute) {
    }

    addTask(event: any): void {
        event.preventDefault();

        this.router.navigate([ROUTES.ADDTASK], { relativeTo: this.route });
    }

    viewTask(event: any): void {
        event.preventDefault();

        this.router.navigate([ROUTES.VIEWTASK], { relativeTo: this.route });
    }
}
