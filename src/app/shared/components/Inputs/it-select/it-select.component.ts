import { AfterViewInit, Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from 'src/app/shared/directives/control-value-accessor.directive';

@Component({
  selector: 'it-select',
  templateUrl: './it-select.component.html',
  styleUrls: ['./it-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItSelectComponent),
      multi: true,
    },
  ],
})
export class ItSelectComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() icon: string = null as any;
  @Input() defaultValue: string = null as any;
  @Input() label = "Label";

  override getId() {
    return `${this.id}-select-element`
  }
}
