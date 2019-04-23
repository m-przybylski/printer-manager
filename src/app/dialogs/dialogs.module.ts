import { NgModule } from '@angular/core';
import { MaterialComponentsModule } from '../components/material.module';
import { AddPrinterDialogComponent } from './add-printer/add-printer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MaterialComponentsModule, ReactiveFormsModule, CommonModule],
  declarations: [AddPrinterDialogComponent],
  entryComponents: [AddPrinterDialogComponent],
})
export class DialogsModule {}
