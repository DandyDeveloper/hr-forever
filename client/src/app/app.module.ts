import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { ToDoComponent } from './todo-section/todo-section.component';
import { DetailsSectionComponent } from './details-section/details-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeftNavComponent,
    TopNavComponent,
    ToDoComponent,
    DetailsSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
