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
export class ItSelectComponent<T> extends ControlValueAccessorDirective<T> implements AfterViewInit {
  @Input() id = "";
  @Input() defaultValue: boolean = false;
  @Input() label = "Label";

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
}
