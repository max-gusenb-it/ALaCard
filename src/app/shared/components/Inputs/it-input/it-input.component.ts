import { AfterViewInit, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessorDirective } from '../../../directives/control-value-accessor.directive';
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
  @Input() id = "";
  @Input() label = "Label";
  @Input() type: InputType = "text";
  @Input() icon: string = "";
  isPassword: boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this.isPassword = this.type === "password";
  }

  ngAfterViewInit(): void {
    const input: any = document.getElementById(this.getId());

    this.control?.valueChanges
      .subscribe(v => {
        if (!this.control?.valid) {
          input.setCustomValidity("You gotta fill this out, yo!");
        } else {
          input.setCustomValidity("");
        }
    });
  }

  getId() {
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