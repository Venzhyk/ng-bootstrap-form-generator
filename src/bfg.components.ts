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

import { BfgControl } from './bfg.control';
import { BfgControlOptions, BfgSelectOptions } from './bfg.options';

@Component({ selector: 'bfg-before,bfg-after', template: '<ng-content></ng-content>' })
export class BfgGroupCustomContentComponent { }

@Component({
  selector: 'bfg-form',
  template: `
    <div [formGroup]="form" >
      <ng-content select="bfg-before"></ng-content>
      <template  ngFor let-control [ngForOf]='bfgControls'>
        <div [ngSwitch]="control.type">
          <bfg-hidden *ngSwitchCase="'hidden'" [control]='control' [form]='form'> </bfg-hidden>
          <bfg-checkbox *ngSwitchCase="'checkbox'" [control]='control' [form]='form'> </bfg-checkbox>
          <!-- <bfg-radio *ngSwitchCase="'radio'" [control]='control' [form]='form'> </bfg-radio>-->
          <bfg-select *ngSwitchCase="'select'" [control]='control' [form]='form'> </bfg-select>
          <bfg-input *ngSwitchDefault [control]='control' [form]='form'></bfg-input>
        </div>
      </template >
      <ng-content select="bfg-after"></ng-content>
    </div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfgGroupComponent implements OnInit {
  form: FormGroup;
  private bfgControls: BfgControl[] = [];

  private _options: any;
  @Input()
  get options(): BfgControlOptions[] { return this._options; };
  set options(value: BfgControlOptions[]) {
    this.initFormGroup(value);
    this._options = value;
    this._cd.markForCheck();
  }

  @Input()
  get value(): any { return this.form ? this.form.value : null; };
  set value(value: any) {
    this.form.patchValue(value, { onlySelf: true, emitEvent: true });
    this._cd.markForCheck();
  }

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _cd: ChangeDetectorRef) { }
  ngOnInit() {

  }

  initFormGroup(options: BfgControlOptions[]) {
    let formControls: { [key: string]: FormControl; } = {};

    for (let controlOptions of options) {
      let control = new BfgControl(controlOptions);
      // Radio inputs should have same field name to be grouped
      // Override FormControls that have same name 
      // Create all bfsControl for render.
      control.fc = formControls[control.field] || control.fc;
      formControls[control.field] = control.fc;
      this.bfgControls.push(control);
    }

    this.form = new FormGroup(formControls);

    this.form.valueChanges.subscribe(this.valueChange);
  }


}

@Component({
  selector: 'bfg-control',
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
export class BfgBaseControlComponent implements OnInit {
  private _prev: any;
  @Input('control') c: BfgControl;

  constructor(private _cd: ChangeDetectorRef) {
  }


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
  // ngDoCheck() {
  //   console.log('BaseControl ngDoCheck: ' + this.c.field);
  // }

}


@Component({
  selector: 'bfg-input',
  template: `
    <bfg-control [control]='c'  [formGroup]='form'>
      <label [for]='c.field' >{{c.title}}</label>
      <input class="form-control" [bfgControl]='c' [formControlName]='c.field' [type]='c.type' [placeholder]='c.placeholder' >
    </bfg-control>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfgInputControlComponent {
  @Input('control') c: BfgControl;
  @Input() form: FormGroup;

}

@Component({
  selector: 'bfg-hidden',
  template: `
    <div [formGroup]='form'>
      <input class="form-control" [bfgControl]='c' [formControlName]='c.field' type='hidden'>
    </div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfgHiddenInputControlComponent {
  @Input('control') c: BfgControl;
  @Input() form: FormGroup;

}


@Component({
  selector: 'bfg-checkbox',
  template: `
    <bfg-control [control]='c'  [formGroup]='form'>
      <label [for]='c.field'  class='custom-control custom-checkbox'>
        <input class="custom-control-input" [bfgControl]='c' [formControlName]='c.field' type='checkbox' >
         <span class="custom-control-indicator"></span>
        <span class="custom-control-description">{{c.title}}</span>
      </label>
    </bfg-control>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfgCheckboxControlComponent {
  @Input('control') c: BfgControl;
  @Input() form: FormGroup;
}

// TODO: Implement. After add 'radio' InputType and uncomment ngSwitch in BfgGroupComponent template
@Component({
  selector: 'bfg-radio',
  template: `
    <bfg-control [control]='c'  [formGroup]='form'>
      <label [for]='c.field'  class='custom-control custom-radio'>
        <input class="custom-control-input" [bfgControl]='c' [formControlName]='c.field' type='radio' >
         <span class="custom-control-indicator"></span>
        <span class="custom-control-description">{{c.title}}</span>
      </label>
    </bfg-control>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfgRadioControlComponent implements OnInit {
  @Input('control') c: BfgControl;
  @Input() form: FormGroup;

  ngOnInit() {
    this.c.elId = this.c.elId + '-' + this.c.defaultValue;
  }
}


@Component({
  selector: 'bfg-select',
  template: `
   <bfg-control [control]='c'  [formGroup]='form'>
      <label [for]='c.field'>{{c.title}}</label>
      <select class="form-control custom-select" [bfgControl]='c'  [formControlName]='c.field'>
          <option *ngIf='c.select.emptyText' 
                  [attr.disabled] = 'c.required ? "" : null'
                  [attr.selected] = 'c.fc.value === "" ? "" : null'
                  value=''> {{ c.select.emptyText}} </option>
          <option *ngFor='let opt of c.select.options' [value]="opt.value" 
                  [attr.selected] ='opt.value === c.fc.value ? "" : null'>{{opt.text}}</option>
      </select>
  </bfg-control>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BfgSelectControlComponent {
  @Input('control') c: BfgControl;
  @Input() form: FormGroup;
}


@Directive({
  selector: '[bfgControl]',
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
export class BfgControlDirective {
  @Input('bfgControl') c: BfgControl;
}
