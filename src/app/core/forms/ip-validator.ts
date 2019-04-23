import { ValidatorFn, AbstractControl } from '@angular/forms';

// tslint:disable-next-line: max-line-length
const ipRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const ipValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const valid = ipRegExp.test(control.value);
  return valid ? null : { invalidIp: true };
};
