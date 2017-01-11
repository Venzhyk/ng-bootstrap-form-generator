import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  BsfBaseControlComponent,
  BsfInputControlComponent,
  BsfHiddenInputControlComponent,
  BsfCheckboxControlComponent,
  BsfRadioControlComponent,
  BsfSelectControlComponent,
  BsfGroupComponent,
  BsfGroupCustomContentComponent,
  BsfControlDirective
} from './bsf.components';
import { BsfControlOptions } from './bsf.options';
import { KeysPipe } from './keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [

    BsfGroupComponent,
    BsfGroupCustomContentComponent,
    BsfBaseControlComponent,
    BsfInputControlComponent,
    BsfHiddenInputControlComponent,
    BsfCheckboxControlComponent,
    BsfRadioControlComponent,
    BsfSelectControlComponent,
    KeysPipe,
    BsfControlDirective
  ],
  exports: [
    BsfGroupComponent,
    BsfGroupCustomContentComponent
  ]
})
export class BootstrapFormGeneratorModule { }
