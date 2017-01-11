import {
  ValidatorFn,
  AsyncValidatorFn,
} from '@angular/forms';

import { ValidationMessage, ValidationMessageFn } from './ValidationMessage';

export type InputType = 'text'
  | 'search' | 'email' | 'url' | 'tel' | 'password'
  | 'number' | 'date' | 'color'
  | 'checkbox' | 'hidden' | 'select';


export class BsfControlOptions {
  elId?: string;
  field: string;
  title?: string = null;
  defaultValue?: any = null;
  type?: InputType = 'text';
  format?: string = null;
  placeholder?: string = '';
  helpText?: string = '';
  helpTextHtml?: string = '';
  disabled?: boolean;
  required?: boolean;
  maxlength?: number;
  minlength?: number;
  requiredTrue?: boolean;

  select?: BsfSelectOptions;

  validator?: ValidatorFn | ValidatorFn[];
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[];
  validationMessage?: { [key: string]: (string | ValidationMessageFn) };
}


export class BsfSelectOptions {
  options?: [{ text: string, value: any }];
  emptyText?: string;
}
