import { AfterViewInit, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessorDirective } from '@shared';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

type InputType = "text" | "number" | "email" | "password";

@Component({
  selector: 'it-input',
  templateUrl: './it-input.component.html',
  styleUrls: ['./it-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItInputComponent),
      multi: true,
    },
  ],
})
export class ItInputComponent<T> extends ControlValueAccessorDirective<T> implements OnInit, AfterViewInit {
  @Input() label = "Label";
  @Input() type: InputType = "text";
  @Input() icon: string = "";
  isPassword: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.isPassword = this.type === "password";
  }

  override getId() {
    return `${this.id}-input-element`
  }

  toggleInputType() {
    if (this.isPassword) {
      this.type = this.type === "password" ? "text" : "password";
    }
  }

  getIconName() {
    if (this.isPassword) {
      return this.type === "password" ? "visibility" : "visibility_off"
    } else {
      return this.icon;
    }
  }
}