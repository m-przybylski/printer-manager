import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ipValidator } from 'src/app/core/forms/ip-validator';
import { Location } from 'src/app/core/interfaces';

export interface AddPrinterPayload {
  locations: Location[];
}

@Component({
  selector: 'pm-add-printer',
  templateUrl: './add-printer.component.html',
  styleUrls: ['./add-printer.component.scss'],
})
export class AddPrinterDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddPrinterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AddPrinterPayload,
  ) {}

  public printerForm: FormGroup;
  public name = new FormControl('', Validators.required);
  public ip = new FormControl('', ipValidator);

  public get locations(): Location[] {
    return this.data.locations;
  }

  ngOnInit() {
    this.printerForm = new FormGroup({
      name: this.name,
      ip: this.ip,
      location: new FormControl(),
    });
  }

  savePrinter() {
    this.dialogRef.close(this.printerForm.value);
  }
}
