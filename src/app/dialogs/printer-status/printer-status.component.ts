import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { StatusEvent } from 'src/app/components/status-chart/status-chart.component';

export interface PrinterStatusDialogPayload {
  events: StatusEvent[];
}

@Component({
  selector: 'pm-printer-status',
  templateUrl: './printer-status.component.html',
  styleUrls: ['./printer-status.component.scss'],
})
export class PrinterStatusDialogComponent {
  public events = this.data.events;
  constructor(@Inject(MAT_DIALOG_DATA) private data: PrinterStatusDialogPayload) {}
}
