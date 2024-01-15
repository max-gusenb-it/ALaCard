import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItButtonComponent } from './components/Buttons/it-button/it-button.component';
import { ItInputComponent } from './components/Inputs/it-input/it-input.component';

@NgModule({
  declarations: [
    ItButtonComponent,
    ItInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ItButtonComponent,
    ItInputComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
