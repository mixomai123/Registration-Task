import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { RegistrationField, RegistrationRequest } from '../registration.model';
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
import { Router } from '@angular/router';
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
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationService
      .getRegistrationFormFields()
      .subscribe((res) => this.initFields(res));
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
    const req: RegistrationRequest = {
      ...this.form.getRawValue(),
    };
    this.registrationService.register(req).subscribe(() => {
      this.router.navigate(['/welcome']);
    });
  }
}
