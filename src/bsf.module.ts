import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  BsfBaseControlComponent,
  BsfInputControlComponent,
  BsfCheckboxControlComponent,
  BsfRadioControlComponent,
  BsfSelectControlComponent,
  BsfGroupComponent,
  BsfControlDirective
} from './bsf.components';
import { BsfControlOptions } from './bsf.options';
import { KeysPipe } from './keys.pipe';

export * from './index';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    BsfGroupComponent,
    BsfBaseControlComponent,
    BsfInputControlComponent,
    BsfCheckboxControlComponent,
    BsfRadioControlComponent,
    BsfSelectControlComponent,
    KeysPipe,
    BsfControlDirective
  ],
  exports: [
    BsfGroupComponent,
  ]
})
export class BootstrapFormGeneratorModule { }
