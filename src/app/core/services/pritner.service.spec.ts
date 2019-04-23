import { PrinterService } from './printer.service';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { Deceiver } from 'deceiver-core';
import { getScheduler } from 'src/testing/testing';
import { of, EMPTY } from 'rxjs';

describe('PrinterService', () => {
  let service: PrinterService;
  let localStorageService: LocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PrinterService,
        {
          provide: LocalStorageService,
          useValue: Deceiver(LocalStorageService),
        },
      ],
    });
  });
  beforeEach(() => {
    service = TestBed.get(PrinterService);
    localStorageService = TestBed.get(LocalStorageService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get printers list', () => {
    const resultArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
    getScheduler().run(({ cold, expectObservable }) => {
      localStorageService.get = jest.fn(() => cold('--a|', { a: resultArray })) as any;
      const result = service.getAll();
      expectObservable(result).toBe('--a|', { a: resultArray });
    });
  });
  it('should get printer by specific id', () => {
    const resultArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
    getScheduler().run(({ cold, expectObservable }) => {
      localStorageService.get = jest.fn(() => cold('--a|', { a: resultArray })) as any;
      const result = service.getById(2);
      expectObservable(result).toBe('--a|', { a: { id: 2 } });
    });
  });
  it('should throw if element not found', () => {
    const resultArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
    getScheduler().run(({ cold, expectObservable }) => {
      localStorageService.get = jest.fn(() => cold('--a|', { a: resultArray })) as any;
      const result = service.getById(5);
      expectObservable(result).toBe('--a|', { a: undefined });
    });
  });
  it('should return undefined if element not found', () => {
    getScheduler().run(({ cold, expectObservable }) => {
      localStorageService.get = jest.fn(() => cold('--#', {}, { code: 404 })) as any;
      const result = service.getById(5);
      expectObservable(result).toBe('--(a|)', { a: undefined });
    });
  });
  it('should return undefined if element not found', () => {
    getScheduler().run(({ cold, expectObservable }) => {
      localStorageService.get = jest.fn(() => cold('--#', {}, 'error')) as any;
      const result = service.getById(5);
      expectObservable(result).toBe('--#', {}, 'error');
    });
  });
  it('should add printer to the list', () => {
    const resultArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    localStorageService.get = jest.fn(() => of(resultArray)) as any;
    localStorageService.set = jest.fn(() => EMPTY) as any;
    service.addPrinter({ id: 4 } as any).subscribe();
    expect((localStorageService.set as jest.Mock).mock.calls[0][1]).toEqual(result);
  });
  it('should add printer to the list', () => {
    const resultArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    localStorageService.get = jest.fn(() => of(resultArray)) as any;
    localStorageService.set = jest.fn(() => EMPTY) as any;
    service.addPrinter({} as any).subscribe();
    expect((localStorageService.set as jest.Mock).mock.calls[0][1]).toEqual(result);
  });
  it('should update printer on the list', () => {
    const resultArray = [{ id: 1 }, { id: 2, name: 'old' }, { id: 3 }];
    const elementUpdated = { id: 2, name: 'new' };
    const result = [{ id: 1 }, { id: 2, name: 'new' }, { id: 3 }];
    const save = jest.fn(() => EMPTY);
    localStorageService.get = jest.fn(() => of(resultArray)) as any;
    localStorageService.set = save as any;
    service.updatePrinter(elementUpdated as any).subscribe();
    expect((localStorageService.set as jest.Mock).mock.calls[0][1]).toEqual(result);
  });
});
