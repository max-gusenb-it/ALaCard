import { AfterViewInit, Component, Input, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from 'src/app/shared/directives/control-value-accessor.directive';

@Component({
  selector: 'it-checkbox-heading',
  templateUrl: './it-checkbox-heading.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItCheckboxHeadingComponent),
      multi: true,
    },
  ]
})
export class ItCheckboxHeadingComponent extends ControlValueAccessorDirective<boolean> implements AfterViewInit {
  @Input() heading: string = "";

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.animateToggle();
    });
  }

  toggleHeading() {
    if (!!this.control) {
      this.control.setValue(!this.control.value);
      this.animateToggle();
    }
  }

  animateToggle() {
    if (!!this.control) {
      const element = document.getElementById("content");
      if (element == null) {
        console.error("it-checkbox-heading: content element not found!");
      }
  
      if (this.control.value) {
        element!.style.maxHeight = element!.scrollHeight + "px";
      } else {
        element!.style.maxHeight = "0px";
      }
    }
  }

  test() {
    document.getElementById("content")?.scrollHeight;
  }
}
