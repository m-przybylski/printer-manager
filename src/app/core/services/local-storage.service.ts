import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  public set(key: string, data: any): Observable<never> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
      return throwError(e);
    }
    return EMPTY;
  }

  public get<T>(key: string): Observable<T> {
    let result: T | null;
    try {
      result = JSON.parse(localStorage.getItem(key));
      if (result === null) {
        return throwError({ code: 404 });
      }
      return of(result);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return throwError(e);
    }
  }
}
