import { BsfControl } from './bsf.control';


export interface ValidationMessageFn { (error: any, control?: BsfControl): string; }

export class ValidationMessage {
  public static DEFAULT = {
    required: function (error: any, c: BsfControl) {
      return `${c.title} is required`;
    },

    minlength: function (error: any, c: BsfControl): string {
      return `Min length is ${error.requiredLength} charecters. Current length is ${error.actualLength}`;
    },

    maxlength: function (error: any, c: BsfControl): string {
      return `Max length is ${error.requiredLength} charecters. Current length is ${error.actualLength}`;
    }
  }
}
