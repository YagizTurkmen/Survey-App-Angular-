import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatorComponent } from './creator/creator.component';
import { RemoverComponent } from './remover/remover.component';
import { UpdaterComponent } from './updater/updater.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
    RemoverComponent,
    UpdaterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
