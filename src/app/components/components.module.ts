import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MaterialComponentsModule } from './material.module';
import { PrinterTableComponent } from './printer-table/printer-table.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MaterialComponentsModule, CommonModule],
  declarations: [HeaderComponent, PrinterTableComponent],
  exports: [HeaderComponent, PrinterTableComponent],
  entryComponents: [],
})
export class ComponentModule {}
