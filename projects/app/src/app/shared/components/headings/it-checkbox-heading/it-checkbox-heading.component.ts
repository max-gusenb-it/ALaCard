import { AfterViewInit, Component, ElementRef, Input, ViewChild, forwardRef, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '@shared';

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
  @ViewChild("content") content?: ElementRef<HTMLDivElement>;

  @Input() heading: string = "";

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.animateToggle();
    });
  }

  toggleHeading() {
    if (!!this.control && !this.control.disabled) {
      this.control.setValue(!this.control.value);
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
