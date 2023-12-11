import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ItButtonComponent } from './components/Buttons/it-button/it-button.component';

@NgModule({
  declarations: [
    ItButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    ItButtonComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
