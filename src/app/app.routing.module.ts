import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrinterListComponent } from './containers/printer-list/printer-list.component';
import { PrinterComponent } from './containers/printer/printer.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        component: PrinterListComponent,
      },
      {
        path: ':id',
        component: PrinterComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
