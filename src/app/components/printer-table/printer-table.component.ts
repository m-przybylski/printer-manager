import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPrinterDialogComponent, AddPrinterPayload } from '../../dialogs/add-printer/add-printer.component';
import { Printer } from 'src/app/core/interfaces';
import { PrinterService } from 'src/app/core/services/printer.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pm-printer-table',
  templateUrl: './printer-table.component.html',
  styleUrls: ['./printer-table.component.scss'],
})
export class PrinterTableComponent implements OnDestroy {
  constructor(
    private modal: MatDialog,
    private printerService: PrinterService,
    private locationService: LocationService,
  ) {}

  public printers$ = this.printerService.getAll();
  public displayedColumns: string[] = ['name', 'ip', 'options'];

  private destroyed$ = new Subject();

  public openAddModal() {
    this.locationService
      .getAll()
      .pipe(
        switchMap(locations =>
          this.modal
            .open<AddPrinterDialogComponent, AddPrinterPayload, Printer>(AddPrinterDialogComponent, {
              data: { locations },
            })
            .afterClosed(),
        ),
        switchMap(printer => this.printerService.addPrinter(printer)),
        takeUntil(this.destroyed$),
      )
      .subscribe({
        complete: () => {
          this.printers$ = this.printerService.getAll();
        },
      });
  }

  public ngOnDestroy() {
    this.modal.closeAll();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public editPrinter(pritner: Printer) {}
}
