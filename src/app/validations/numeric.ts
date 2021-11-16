import { FormControl } from '@angular/forms';

export function validateNumber(control: FormControl): { [s: string]: boolean } {
  if (control.value === null) return null;

  if (isNaN(control.value) || (Number(control.value) < 0)) {
    return { 'NaN': true };
  }

  return null;
}
