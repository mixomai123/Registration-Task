import { FieldValidation, ValidatorName } from './registration.model';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const ERROR_MESSAGE_KEY = 'message';

export function customValidatorFn(validator: FieldValidation): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let hasDefaultError = false;
    switch (validator.name) {
      case ValidatorName.regex:
        hasDefaultError = !!Validators.pattern(String(validator.value))(
          control
        );
        break;
      case ValidatorName.maxlength:
        hasDefaultError = !!Validators.maxLength(Number(validator.value))(
          control
        );
        break;
      case ValidatorName.minlength:
        hasDefaultError = !!Validators.minLength(Number(validator.value))(
          control
        );
        break;
    }
    return hasDefaultError ? { [ERROR_MESSAGE_KEY]: validator.message } : null;
  };
}
