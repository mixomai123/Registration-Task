import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { FieldValidation, RegistrationField } from '../registration.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
//TODO: refactor , move custom validator in separate file
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  formFields: RegistrationField[] = [];
  form: FormGroup = this.fb.group({});

  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initFields(this.registrationService.getRegistrationFormFields());
  }
  initFields(fields: RegistrationField[]) {
    this.formFields = fields;
    for (const field of fields) {
      const control = this.fb.control('');
      field?.validations
        ?.reverse()
        .map((validation) =>
          control.addValidators(customValidator(validation))
        );
      this.form.addControl(field.name, control);
    }
  }
  getFirstError(obj: ValidationErrors | null): string {
    return obj ? Object.values(obj)[0] : '';
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.getRawValue());
    }
  }
}
export function customValidator(validator: FieldValidation): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let hasDefaultError = false;
    switch (validator.name) {
      case 'regex':
        hasDefaultError = !!Validators.pattern(String(validator.value))(
          control
        );
        break;
      case 'maxlength':
        hasDefaultError = !!Validators.maxLength(Number(validator.value))(
          control
        );
        break;
      case 'minlength':
        hasDefaultError = !!Validators.minLength(Number(validator.value))(
          control
        );
        break;
    }
    return hasDefaultError ? { message: validator.message } : null;
  };
}
