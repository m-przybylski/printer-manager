import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Printer } from './interfaces';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PrinterService {
  private readonly PRINTERS = 'PRINTERS';
  constructor(private localStorageService: LocalStorageService) {}
  public getAll(): Observable<Printer[]> {
    return this.localStorageService.get<Printer[]>(this.PRINTERS);
  }

  public getById(id: number): Observable<Printer | undefined> {
    return this.localStorageService.get<Printer[]>(this.PRINTERS).pipe(
      map(printers => this.findPrinter(printers, id)),
      catchError(error => {
        if (error.code === 404) {
          return of(undefined);
        }
        return throwError(error);
      }),
    );
  }

  public addPrinter(printer: Printer): Observable<never> {
    return this.upsertPrinter(printer);
  }
  public updatePrinter(printer: Printer): Observable<never> {
    return this.upsertPrinter(printer);
  }

  private upsertPrinter(printer: Printer) {
    printer.id = printer.id || -1;
    return this.getAll().pipe(
      map(printers => {
        printers = printers || [];
        const oldPrinter = this.findPrinter(printers, printer.id);
        if (oldPrinter === undefined) {
          if (printer.id === -1) {
            printer.id = printers.reduce((maxID, curPrinter) => {
              if (maxID <= curPrinter.id) {
                return curPrinter.id + 1;
              }
              return maxID;
            }, -1);
          }
          return printers.concat(printer);
        }
        Object.assign(oldPrinter, printer);
        return printers;
      }),
      switchMap(printers => this.localStorageService.set(this.PRINTERS, printers)),
    );
  }

  private findPrinter(printers: Printer[], printerId: number) {
    return printers.find(printer => printer.id === printerId);
  }
}
