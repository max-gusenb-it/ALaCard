import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItButtonComponent } from './components/buttons/it-button/it-button.component';
import { ControlValueAccessorDirective } from './directives/control-value-accessor.directive';
import { ItInputComponent } from './components/inputs/it-input/it-input.component';
import { ItIconButtonComponent } from './components/buttons/it-icon-button/it-icon-button.component';
import { ItIconComponent } from './components/display/it-icon/it-icon.component';
import { ItSelectComponent } from './components/inputs/it-select/it-select.component';
import { ItTextAreaComponent } from './components/inputs/it-text-area/it-text-area.component';
import { ItNavigationComponent } from './components/buttons/it-navigation/it-navigation.component';
import { ItNavItemComponent } from './components/buttons/it-navigation/it-nav-item/it-nav-item.component';
import { ItCheckboxComponent } from './components/inputs/it-checkbox/it-checkbox.component';
import { ItCheckboxHeadingComponent } from './components/headings/it-checkbox-heading/it-checkbox-heading.component';

@NgModule({
  declarations: [
    ControlValueAccessorDirective,
    ItButtonComponent,
    ItIconButtonComponent,
    ItCheckboxHeadingComponent,
    ItNavigationComponent,
    ItNavItemComponent,
    ItCheckboxComponent,
    ItInputComponent,
    ItTextAreaComponent,
    ItSelectComponent,
    ItIconComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ItButtonComponent,
    ItIconButtonComponent,
    ItCheckboxHeadingComponent,
    ItNavigationComponent,
    ItCheckboxComponent,
    ItInputComponent,
    ItTextAreaComponent,
    ItSelectComponent,
    ItIconComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
