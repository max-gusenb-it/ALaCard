import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../../directives/control-value-accessor.directive';

@Component({
  selector: 'it-text-area',
  templateUrl: './it-text-area.component.html',
  styleUrls: ['./it-text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItTextAreaComponent),
      multi: true,
    },
  ],
})
export class ItTextAreaComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() label = "Label";

  override getId() {
    return `${this.id}-text-area-element`
  }
}
