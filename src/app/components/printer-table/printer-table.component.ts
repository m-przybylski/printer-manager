import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPrinterComponent } from '../add-printer/add-printer.component';

@Component({
  selector: 'pm-printer-table',
  templateUrl: './printer-table.component.html',
  styles: [],
})
export class PrinterTableComponent implements OnInit {
  constructor(private modal: MatDialog) {}

  ngOnInit() {}

  public openAddModal() {
    this.modal.open(AddPrinterComponent);
  }
}
