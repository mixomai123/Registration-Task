import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { RegistrationService } from '../registration.service';
import {
  customValidatorFn,
  ERROR_MESSAGE_KEY,
} from '../registration-form-validator';
import {
  RegistrationField,
  RegistrationFieldClass,
} from '../../shared/registration-field.model';
import { RegistrationRequest } from '../../shared/registration-request.model';
import { validate } from 'class-validator';
import { ValidationError } from 'class-validator/types/validation/ValidationError';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  formFields: RegistrationField[] = [];
  form: FormGroup = this.fb.group({});
  classValidatorErrors: ValidationError[] = [];
  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationService
      .getRegistrationFormFields()
      .subscribe((res) => this.initFields(res));
  }
  async initFields(fields: RegistrationField[]) {
    this.formFields = fields;

    for (const field of fields) {
      //class-validator
      const fieldsValidatorObject = new RegistrationFieldClass(field);
      this.classValidatorErrors = await validate(fieldsValidatorObject);
      if (this.classValidatorErrors?.length) return;
      //
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
    const req: RegistrationRequest = {
      ...this.form.getRawValue(),
    };
    this.registrationService.register(req).subscribe(() => {
      this.router.navigate(['/welcome']);
    });
  }
}
