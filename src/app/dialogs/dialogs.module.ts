import { NgModule } from '@angular/core';
import { MaterialComponentsModule } from '../components/material.module';
import { AddEditPrinterDialogComponent } from './add-edit-printer/add-edit-printer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MaterialComponentsModule, ReactiveFormsModule, CommonModule],
  declarations: [AddEditPrinterDialogComponent],
  entryComponents: [AddEditPrinterDialogComponent],
})
export class DialogsModule {}
