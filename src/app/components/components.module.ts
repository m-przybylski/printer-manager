import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MaterialComponentsModule } from './material.module';
import { PrinterTableComponent } from './printer-table/printer-table.component';
import { CommonModule } from '@angular/common';
import { PrinterDetailsComponent } from './printer-details/printer-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [MaterialComponentsModule, CommonModule, RouterModule],
  declarations: [HeaderComponent, PrinterTableComponent, PrinterDetailsComponent],
  exports: [HeaderComponent, PrinterTableComponent, PrinterDetailsComponent],
  entryComponents: [],
})
export class ComponentModule {}
