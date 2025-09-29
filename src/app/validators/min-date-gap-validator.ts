import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minDateGapValidator(minimumDays: number): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const start = formGroup.get('startDate')?.value;
    const end = formGroup.get('endDate')?.value;
    console.log(start, end, 'Start & End date');

    if (!start || !end) return null;

    const startDate = new Date(start);
    const endDate = new Date(end);
    console.log(startDate, endDate, 'Inside Date function');

    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
    console.log(diffInDays, 'diff in time');

    if (diffInDays < minimumDays) {
      return { minDateGap: true };
    }

    return null;
  };
}
