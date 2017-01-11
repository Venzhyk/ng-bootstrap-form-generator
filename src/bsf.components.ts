import {
  Injectable, Component, Directive, HostBinding, Input, Output, OnInit, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
  AbstractControl
} from '@angular/forms';

import { BsfControl } from './bsf.control';
import { BsfControlOptions, BsfSelectOptions } from './bsf.options';

@Component({
  selector: 'bsf-form',
  template: `
    <div [formGroup]="form" >
      <template  ngFor let-control [ngForOf]='bsfControls'>
        <div [ngSwitch]="control.type">
          <bsf-checkbox *ngSwitchCase="'checkbox'" [control]='control' [form]='form'> </bsf-checkbox>
          <!-- <bsf-radio *ngSwitchCase="'radio'" [control]='control' [form]='form'> </bsf-radio>-->
          <bsf-select *ngSwitchCase="'select'" [control]='control' [form]='form'> </bsf-select>
          <bsf-input *ngSwitchDefault [control]='control' [form]='form'></bsf-input>
        </div>
      </template >
      <ng-content></ng-content>
    </div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsfGroupComponent implements OnInit {
  form: FormGroup;
  bsfControls: BsfControl[] = [];

  private _options: any;
  @Input()
  get options(): BsfControlOptions[] { return this._options; };
  set options(value: BsfControlOptions[]) {
    this.initFormGroup(value);
    this._options = value;
    this._cd.markForCheck();
  }

  @Input()
  get ngModel(): any { return this.form ? this.form.value : null; };
  set ngModel(value: any) { this.form.setValue(value, { onlySelf: false, emitEvent: true }); this._cd.markForCheck(); }

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _cd: ChangeDetectorRef) { }
  ngOnInit() {

  }

  initFormGroup(options: BsfControlOptions[]) {
    let formControls: { [key: string]: FormControl; } = {};

    for (let controlOptions of options) {
      let control = new BsfControl(controlOptions);
      // Radio inputs should have same field name to be grouped
      // Override FormControls that have same name 
      // Create all bfsControl for render.
      control.fc = formControls[control.field] || control.fc;
      formControls[control.field] = control.fc;
      this.bsfControls.push(control);
    }

    this.form = new FormGroup(formControls);

    this.form.valueChanges.subscribe(this.ngModelChange);
  }


}

@Component({
  selector: 'bsf-control',
  template: `
    <div class="form-group"
        [class.has-danger] = '!c.fc.valid && !c.disabled && !c.fc.pristine'
        [class.has-success] = 'c.fc.valid && !c.disabled && c.fc.validator'>

      <ng-content></ng-content>

      <div *ngFor='let error of c.errors' class="form-control-feedback">{{error}}</div>
      <small [id]='c.field + "-help-text"' class="form-text text-muted" *ngIf='c.helpText' >{{c.helpText}}</small>
      <small [id]='c.field + "-help-text"' class="form-text text-muted" *ngIf='!c.helpText && c.helpTextHtml' 
             [innerHTML]='c.helpTextHtml'></small>
    </div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsfBaseControlComponent {
  @Input('control') c: BsfControl;

  constructor(private _cd: ChangeDetectorRef) {
  }

  _prev: any;
  ngOnInit() {
    this._prev = this.c.fc.value;
    this.c.fc.valueChanges.subscribe((next) => {
      if (next !== this._prev) {
        this._prev = next;
        this._cd.markForCheck();
      }
    });
  }
  // Uncomment to see how many checks performs on edit
  ngDoCheck() {
    console.log('BaseControl ngDoCheck: ' + this.c.field);
  }

}


@Component({
  selector: 'bsf-input',
  template: `
    <bsf-control [control]='c'  [formGroup]='form'>
      <label [for]='c.field' >{{c.title}}</label>
      <input class="form-control" [bsfControl]='c' [formControlName]='c.field' [type]='c.type' [placeholder]='c.placeholder' >
    </bsf-control>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsfInputControlComponent {
  @Input('control') c: BsfControl;
  @Input() form: FormGroup;

}


@Component({
  selector: 'bsf-checkbox',
  template: `
    <bsf-control [control]='c'  [formGroup]='form'>
      <label [for]='c.field'  class='custom-control custom-checkbox'>
        <input class="custom-control-input" [bsfControl]='c' [formControlName]='c.field' type='checkbox' >
         <span class="custom-control-indicator"></span>
        <span class="custom-control-description">{{c.title}}</span>
      </label>
    </bsf-control>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsfCheckboxControlComponent {
  @Input('control') c: BsfControl;
  @Input() form: FormGroup;
}

// TODO: Implement. After add 'radio' InputType and uncomment ngSwitch in BsfGroupComponent template
@Component({
  selector: 'bsf-radio',
  template: `
    <bsf-control [control]='c'  [formGroup]='form'>
      <label [for]='c.field'  class='custom-control custom-radio'>
        <input class="custom-control-input" [bsfControl]='c' [formControlName]='c.field' type='radio' >
         <span class="custom-control-indicator"></span>
        <span class="custom-control-description">{{c.title}}</span>
      </label>
    </bsf-control>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsfRadioControlComponent {
  @Input('control') c: BsfControl;
  @Input() form: FormGroup;

  ngOnInit() {
    this.c.elId = this.c.elId + "-" + this.c.defaultValue;
  }
}


@Component({
  selector: 'bsf-select',
  template: `
   <bsf-control [control]='c'  [formGroup]='form'>
      <label [for]='c.field'>{{c.title}}</label>
      <select class="form-control custom-select" [bsfControl]='c'  [formControlName]='c.field'>
          <option *ngIf='c.select.emptyText' 
                  [attr.disabled] = 'c.required ? "" : null'
                  [attr.selected] = 'c.fc.value === "" ? "" : null'
                  value=''> {{ c.select.emptyText}} </option>
          <option *ngFor='let opt of c.select.options' [value]="opt.value" 
                  [attr.selected] ='opt.value === c.fc.value ? "" : null'>{{opt.text}}</option>
      </select>
  </bsf-control>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsfSelectControlComponent {
  @Input('control') c: BsfControl;
  @Input() form: FormGroup;
}


@Directive({
  selector: '[bsfControl]',
  host: {
    '[id]': 'c.elId',
    '[name]': 'c.field',
    '[class.form-control-danger]': '!c.fc.valid',
    '[class.form-control-success]': 'c.fc.valid && c.fc.validator',
    '[attr.aria-describedby]': 'c.field + "-help-text"',
    '[attr.disabled]': 'c.disabled',
    '[attr.required]': 'c.required',
  }
})
export class BsfControlDirective {
  @Input('bsfControl') c: BsfControl;
}
