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
  @Input() customColor: Color | undefined;

  override getId() {
    return `${this.id}-select-element`
  }

  getColorClassesForSelect() : string {
    let color = this.customColor?.valueOf();
    let css = "";
    
    if (!!!this.customColor) color = "primary";
    switch(color) {
      case("primary"): {
        css += "bg-primary-200 border-primary-200 hover:border-b-primary-500 focus:border-primary-500 disabled:bg-primary-100 disabled:border-primary-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500";
      } break;
      case("red"): {
        css += "bg-red-200 border-red-200 hover:border-b-red-500 focus:border-red-500 disabled:bg-red-100 disabled:border-red-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500";
      } break;
      case("blue"): {
        css += "bg-blue-200 border-blue-200 hover:border-b-blue-500 focus:border-blue-500 disabled:bg-blue-100 disabled:border-blue-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-blue-500";
      }
    }
    
    if (this.hideLabel) css += " text-transparent";
    return css;
  }
}
