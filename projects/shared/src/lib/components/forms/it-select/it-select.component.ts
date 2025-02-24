import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorUtils } from '@features';
import { ControlValueAccessorDirective } from '@shared';
import { Color } from '@shared';

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
    
    css += ColorUtils.getSelectCSS(color!);
    if (this.hideLabel) css += " text-transparent";
    return css;
  }
}
