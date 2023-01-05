import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { RegistrationField } from '../registration.model';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  customValidatorFn,
  ERROR_MESSAGE_KEY,
} from '../registration-form-validator';
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
      const control = this.fb.control(
        '',
        field.required ? Validators.required : null
      );

      field.validations?.map((validation) =>
        control.addValidators(customValidatorFn(validation))
      );

      this.form.addControl(field.name, control);
    }
  }
  getErrorMessage(obj: ValidationErrors | null): string {
    return obj?.[ERROR_MESSAGE_KEY];
  }
  onSubmit() {
    if (this.form.valid) {
      this.registrationService.submitRegistrationForm(this.form.getRawValue());
    }
  }
}
