import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MaterialComponentsModule } from './material.module';
import { AddPrinterComponent } from './add-printer/add-printer.component';
import { PrinterTableComponent } from './printer-table/printer-table.component';

@NgModule({
  imports: [MaterialComponentsModule],
  declarations: [HeaderComponent, AddPrinterComponent, PrinterTableComponent],
  exports: [HeaderComponent, AddPrinterComponent, PrinterTableComponent],
  entryComponents: [AddPrinterComponent],
})
export class ComponentModule {}
