export interface FieldValidation {
  name: ValidatorName;
  message: string;
  value: string | number;
}
export interface RegistrationField {
  type: 'text' | 'email' | 'phone' | 'password';
  name: string;
  label: string;
  required: boolean;
  validations?: FieldValidation[];
}
export interface RegistrationRequest {
  [fieldName: string]: string;
}

export enum ValidatorName {
  minlength = 'minlength',
  maxlength = 'maxlength',
  regex = 'regex',
}
