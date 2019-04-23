import { Injectable } from '@angular/core';
import { Location } from '../interfaces';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {
  public getAll(): Observable<Location[]> {
    return of([
      { floor: '2nd', room: '324' },
      { floor: '2nd', room: '432' },
      { floor: '2nd', room: '123' },
      { floor: '1nd', room: '421' },
      { floor: '1nd', room: '311' },
      { floor: '1nd', room: '567' },
    ]);
  }
}
