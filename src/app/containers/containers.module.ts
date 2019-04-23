import { NgModule } from '@angular/core';
import { PrinterListComponent } from './printer-list/printer-list.component';
import { ComponentModule } from '../components/components.module';
import { PrinterComponent } from './printer/printer.component';

@NgModule({
  imports: [ComponentModule],
  declarations: [PrinterListComponent, PrinterComponent],
})
export class ContainersModule {}
