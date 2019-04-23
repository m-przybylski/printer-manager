import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ipValidator } from 'src/app/core/forms/ip-validator';
import { Location, Printer } from 'src/app/core/interfaces';

export interface AddEditPrinterPayload {
  locations: Location[];
  printer?: Printer;
}

@Component({
  selector: 'pm-add-edit-printer',
  templateUrl: './add-edit-printer.component.html',
  styleUrls: ['./add-edit-printer.component.scss'],
})
export class AddEditPrinterDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddEditPrinterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddEditPrinterPayload,
  ) {}

  public printerForm: FormGroup;
  public name = new FormControl('', Validators.required);
  public ip = new FormControl('', ipValidator);
  public isEditMode = false;

  public get locations(): Location[] {
    return this.data.locations;
  }

  ngOnInit() {
    this.isEditMode = this.data.printer !== undefined ? true : false;
    this.printerForm = new FormGroup({
      id: new FormControl(),
      name: this.name,
      ip: this.ip,
      location: new FormControl(),
      isColor: new FormControl(),
      description: new FormControl(),
    });

    if (this.isEditMode) {
      this.printerForm.patchValue(this.data.printer);
    }
  }

  public savePrinter() {
    this.dialogRef.close(this.printerForm.value);
  }

  public compareFn(l1: Location, l2: Location): boolean {
    return l1 && l2 ? l1.floor === l2.floor && l1.room === l2.room : l1 === l2;
  }
}
