import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { RegistrationField } from '../registration.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//TODO: refactor with more dynamic validations
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

  onSubmit() {
    console.log(this.form.getRawValue());
  }
  initFields(fields: RegistrationField[]) {
    this.formFields = fields;
    for (const field of fields) {
      const control = this.fb.control('');
      if (field.required) {
        control.addValidators(Validators.required);
      }
      for (const validation of field.validations || []) {
        switch (validation.name) {
          case 'minlength':
            control.addValidators(
              Validators.minLength(Number(validation.value))
            );
            break;
          case 'regex':
            control.addValidators(Validators.pattern(String(validation.value)));
            break;
        }
      }
      this.form.addControl(field.name, control);
    }
  }
}
