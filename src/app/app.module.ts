import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvaBoardComponent } from './canva-board/canva-board.component';
import { DraggableDirective } from './Utilities/Draggable/draggable.directive';

@NgModule({
  declarations: [
    AppComponent,
    CanvaBoardComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
