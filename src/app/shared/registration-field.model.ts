import { FieldValidation } from './field-validation.model';
import { IsIn, IsString, IsBoolean, IsOptional } from 'class-validator';

export interface RegistrationField {
  type: 'text' | 'email' | 'phone' | 'password';
  name: string;
  label: string;
  required: boolean;
  validations?: FieldValidation[];
}
export class RegistrationFieldClass implements RegistrationField {
  @IsIn(['text', 'email', 'phone', 'password'], {
    message: 'type property doesnt contain allowed type',
  })
  type: 'text' | 'email' | 'phone' | 'password' = 'text';

  @IsString()
  name = 'default';

  @IsString()
  label = 'default';

  @IsBoolean({ message: 'required field expects boolean' })
  required = false;

  @IsOptional()
  validations?: FieldValidation[];

  public constructor(init?: Partial<RegistrationFieldClass>) {
    Object.assign(this, init);
  }
}
