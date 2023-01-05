import { ValidatorName } from './validator-name.model';

export interface FieldValidation {
  name: ValidatorName;
  message: string;
  value: string | number;
}
