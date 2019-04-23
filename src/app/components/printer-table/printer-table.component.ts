import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  AddEditPrinterDialogComponent,
  AddEditPrinterPayload,
} from '../../dialogs/add-edit-printer/add-edit-printer.component';
import { Printer } from 'src/app/core/interfaces';
import { PrinterService } from 'src/app/core/services/printer.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Subject, Observable } from 'rxjs';
import { switchMap, takeUntil, filter, map } from 'rxjs/operators';

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

  public printers$ = this.getPrinters();
  public displayedColumns: string[] = ['name', 'ip', 'status', 'options'];

  private destroyed$ = new Subject();

  public openAddModal() {
    this.openModal(this.printerService.addPrinter.bind(this.printerService));
  }

  public ngOnDestroy() {
    this.modal.closeAll();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public editPrinter(printer: Printer) {
    this.openModal(this.printerService.updatePrinter.bind(this.printerService), printer);
  }

  private openModal(updateFunction: (printer: Printer) => Observable<never>, printer?: Printer): void {
    this.locationService
      .getAll()
      .pipe(
        switchMap(locations =>
          this.modal
            .open<AddEditPrinterDialogComponent, AddEditPrinterPayload, Printer>(AddEditPrinterDialogComponent, {
              data: { locations, printer },
            })
            .afterClosed(),
        ),
        filter(newPrinter => !!newPrinter),
        switchMap(updateFunction),
        takeUntil(this.destroyed$),
      )
      .subscribe({
        complete: () => {
          this.printers$ = this.getPrinters();
        },
      });
  }

  private getPrinters() {
    return this.printerService
      .getAll()
      .pipe(
        map(printers =>
          printers.map(printer => ({ ...printer, status: this.printerService.randomizeStatus(printer) })),
        ),
      );
  }
}
