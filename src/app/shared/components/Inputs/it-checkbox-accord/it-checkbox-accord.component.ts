import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from 'src/app/shared/directives/control-value-accessor.directive';

@Component({
  selector: 'it-checkbox-accord',
  templateUrl: './it-checkbox-accord.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItCheckboxAccordComponent),
      multi: true,
    },
  ]
})
export class ItCheckboxAccordComponent extends ControlValueAccessorDirective<boolean> {
  @ViewChild("content") content?: ElementRef<HTMLDivElement>;

  @Input() label: string;

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.animateToggle();
    });
  }

  toggleAccord() {
    if (!!this.control && !this.control.disabled) {
      this.control.setValue(this.control.value);
      this.animateToggle();
    }
  }

  animateToggle() {
    if (!!this.control) {
      if (this.content == null) {
        console.error("it-checkbox-heading: content element not found!");
      }
  
      if (this.control.value) {
        this.content!.nativeElement.style.maxHeight = this.content!.nativeElement.scrollHeight + "px";
      } else {
        this.content!.nativeElement.style.maxHeight = "0px";
      }
    }
  }
}
