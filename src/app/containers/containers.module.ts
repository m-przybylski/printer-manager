import { NgModule } from '@angular/core';
import { PrinterListComponent } from './printer-list/printer-list.component';
import { ComponentsModule } from '../components/components.module';
import { PrinterComponent } from './printer/printer.component';

@NgModule({
  imports: [ComponentsModule],
  declarations: [PrinterListComponent, PrinterComponent],
})
export class ContainersModule {}
