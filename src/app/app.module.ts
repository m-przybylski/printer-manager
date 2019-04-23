import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ComponentModule } from './components/components.module';
import { DialogsModule } from './dialogs/dialogs.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, ComponentModule, DialogsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
