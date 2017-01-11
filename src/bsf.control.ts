
import { Injectable, Component, Directive, HostBinding, Input, forwardRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AsyncValidatorFn,
  Validators
} from '@angular/forms';

import { ValidationMessage, ValidationMessageFn } from './ValidationMessage';
import { BsfControlOptions, InputType } from './bsf.options';



export class BsfControl extends BsfControlOptions {
  fc: FormControl;
  errors: string[] = [];

  constructor(options: BsfControlOptions) {
    super();

    let formState = options.defaultValue;
    let validator = options.validator;
    let asyncValidator = options.asyncValidator;
    this.fc = new FormControl(formState, validator, asyncValidator);

    this.applyOptions(this.fc, options);

    this.subcribeToFormChanges();
  }

  subcribeToFormChanges() {
    const statusChanges$ = this.fc.statusChanges;
    statusChanges$.subscribe((s) => this._onStatusChanged(s));

  }

  private _onStatusChanged(status: string) {
    if (this.fc.errors === null || this.fc.pristine) {
      this.errors = [];
      return;
    }
    let vm = this.validationMessage;
    let fcErrors = this.fc.errors;
    let self = this;

    this.errors = Object.keys(fcErrors)
      .filter(k => vm.hasOwnProperty(k))
      .map(k => (typeof vm[k] === 'string' ? (<string>vm[k]) : (<ValidationMessageFn>vm[k])(fcErrors[k], self)));

  }

  applyOptions(fc: FormControl, o: BsfControlOptions) {
    Object.assign(this, o, { elId: o.elId || o.field });
    this.validationMessage = Object.assign({}, ValidationMessage.DEFAULT, o.validationMessage);
    if (o.disabled) {
      fc.disable({ onlySelf: true, emitEvent: false });
    }
    let validators: ValidatorFn[] = fc.validator ? [fc.validator] : [];

    if (o.required) {
      validators.push(Validators.required);
    }
    if (o.maxlength) {
      validators.push(Validators.maxLength(o.maxlength));
    }
    if (o.minlength) {
      validators.push(Validators.minLength(o.minlength));
    }
    if (o.requiredTrue) {
      validators.push(Validators.requiredTrue);
    }
    fc.setValidators(Validators.compose(validators));
  }
}

