import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color } from 'src/app/core/constants/color';
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
  @Input() hideLabel: boolean = false;
  @Input() hideOption: boolean = false;
  @Input() customColor: Color;

  override getId() {
    return `${this.id}-select-element`
  }

  getColorClassesForSelect() : string {
    let css;
    if (!!!this.customColor) css = "bg-primary-200 border-primary-200 hover:border-b-primary-500 focus:border-primary-500 disabled:bg-primary-900 disabled:border-b-primary-200";
    else css = `bg-${this.customColor}-200 border-${this.customColor}-200 hover:border-b-${this.customColor}-500 focus:border-${this.customColor}-500 disabled:bg-${this.customColor}-900 disabled:border-b-${this.customColor}-200`;
    if (this.hideLabel) css += " text-transparent";
    return css;
  }
}
