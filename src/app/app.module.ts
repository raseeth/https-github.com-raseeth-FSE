import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRouterModule } from './routing.module';
import { AddTaskComponent } from "./task-add/task-add.component";

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule, AppRouterModule ],
  declarations: [ AppComponent, AddTaskComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
