import { AbstractControl, ValidationErrors } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }
    // If another validator has already found an error on the matchingControl, return.
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }
    // Set error on matchingControl if validation fails.
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}
