import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from 'src/app/shared/directives/control-value-accessor.directive';

@Component({
  selector: 'it-checkbox',
  templateUrl: './it-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItCheckboxComponent),
      multi: true,
    },
  ],
})
export class ItCheckboxComponent<T> extends ControlValueAccessorDirective<boolean> implements OnInit {
  @Input() label = "";

  override getId() {
    return `${this.id}-checkbox-element`
  }

  toggleValue() {
    this.writeValue(!this.control?.value);
  }
}
