import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  BfgBaseControlComponent,
  BfgInputControlComponent,
  BfgHiddenInputControlComponent,
  BfgCheckboxControlComponent,
  BfgRadioControlComponent,
  BfgSelectControlComponent,
  BfgRadioButtonGroupControlComponent,
  BfgGroupComponent,
  BfgGroupCustomContentComponent,
  BfgControlDirective
} from './bfg.components';
import { BfgControlOptions } from './bfg.options';
import { KeysPipe } from './keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [

    BfgGroupComponent,
    BfgGroupCustomContentComponent,
    BfgBaseControlComponent,
    BfgInputControlComponent,
    BfgHiddenInputControlComponent,
    BfgCheckboxControlComponent,
    BfgRadioControlComponent,
    BfgSelectControlComponent,
    BfgRadioButtonGroupControlComponent,
    KeysPipe,
    BfgControlDirective
  ],
  exports: [
    BfgGroupComponent,
    BfgGroupCustomContentComponent
  ]
})
export class BootstrapFormGeneratorModule { }
