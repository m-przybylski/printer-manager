import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ComponentModule } from './components/components.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { ContainersModule } from './containers/containers.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ComponentModule,
    DialogsModule,
    AppRoutingModule,
    ContainersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
