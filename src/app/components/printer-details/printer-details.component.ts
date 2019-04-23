import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrinterService } from 'src/app/core/services/printer.service';
import { Printer } from 'src/app/core/interfaces';
import {
  PrinterStatusDialogComponent,
  PrinterStatusDialogPayload,
} from 'src/app/dialogs/printer-status/printer-status.component';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil, filter, switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'pm-printer-details',
  templateUrl: './printer-details.component.html',
  styleUrls: ['./printer-details.component.scss'],
})
export class PrinterDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private printerService: PrinterService,
    private router: Router,
    private matDialog: MatDialog,
  ) {}
  public selectedPrinter: Printer;
  private destroyed$ = new Subject();
  public ngOnInit() {
    const printerId = this.route.snapshot.paramMap.get('id');
    if (printerId === null) {
      this.navigateNotFount();
    }
    this.printerService.getById(parseInt(printerId, 10)).subscribe(
      printer => {
        if (printer === undefined) {
          return this.navigateNotFount();
        }
        this.selectedPrinter = printer;
      },
      () => this.navigateNotFount(),
    );
  }

  public ngOnDestroy() {
    this.matDialog.closeAll();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public removePrinter(printer: Printer) {
    this.matDialog
      .open<ConfirmationDialogComponent, undefined, boolean>(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(
        filter(result => result),
        switchMap(() => {
          this.router.navigate(['/']);
          return this.printerService.removePrinter(printer);
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }

  public openReport() {
    this.matDialog.open<PrinterStatusDialogComponent, PrinterStatusDialogPayload>(PrinterStatusDialogComponent, {
      data: {
        events: [
          {
            startTime: this.getTimeInPast(180),
            status: false,
          },
          {
            startTime: this.getTimeInPast(120),
            status: true,
          },
          {
            startTime: this.getTimeInPast(90),
            status: false,
          },
          {
            startTime: this.getTimeInPast(65),
            status: true,
          },
          {
            startTime: this.getTimeInPast(60),
            status: false,
          },
          {
            startTime: this.getTimeInPast(35),
            status: true,
          },
          {
            startTime: this.getTimeInPast(25),
            status: false,
          },
          {
            startTime: this.getTimeInPast(5),
            status: true,
          },
        ],
      },
    });
  }

  /**
   * get time in past to mock data for chart
   * @param timeSpan time to travel in minutes
   */
  private getTimeInPast(timeSpan: number): Date {
    timeSpan = timeSpan * 60 * 1000;
    return new Date(new Date().getTime() - timeSpan);
  }

  private navigateNotFount(): void {
    this.router.navigate(['not-found']);
  }
}
