import { BfgControl } from './bfg.control';


export interface ValidationMessageFn { (error: any, control?: BfgControl): string; }

export class ValidationMessage {
  public static DEFAULT = {
    required: function (error: any, c: BfgControl) {
      return `${c.title} is required`;
    },

    minlength: function (error: any, c: BfgControl): string {
      return `Min length is ${error.requiredLength} charecters. Current length is ${error.actualLength}`;
    },

    maxlength: function (error: any, c: BfgControl): string {
      return `Max length is ${error.requiredLength} charecters. Current length is ${error.actualLength}`;
    }
  }
}
