import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrinterListComponent } from './containers/printer-list/printer-list.component';
import { PrinterComponent } from './containers/printer/printer.component';
import { NotFoundComponent } from './components/not-found/not-found-component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: PrinterListComponent,
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: ':id',
        component: PrinterComponent,
      },
      {
        path: '**',
        redirectTo: '/',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
