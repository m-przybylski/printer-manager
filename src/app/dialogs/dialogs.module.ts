import { NgModule } from '@angular/core';
import { MaterialComponentsModule } from '../components/material.module';
import { AddEditPrinterDialogComponent } from './add-edit-printer/add-edit-printer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrinterStatusDialogComponent } from './printer-status/printer-status.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [MaterialComponentsModule, ReactiveFormsModule, CommonModule, ComponentsModule],
  declarations: [AddEditPrinterDialogComponent, PrinterStatusDialogComponent],
  entryComponents: [AddEditPrinterDialogComponent, PrinterStatusDialogComponent],
})
export class DialogsModule {}
