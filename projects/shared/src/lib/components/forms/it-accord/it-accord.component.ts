import { AfterViewInit, Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { ItSelectableComponent } from '../it-selectable/it-selectable.component';

@Component({
  selector: 'it-accord',
  templateUrl: './it-accord.component.html',
  providers: [{provide: ItSelectableComponent, useExisting: forwardRef(() => ItAccordComponent)}]
})
export class ItAccordComponent extends ItSelectableComponent implements AfterViewInit {

  @ViewChild("content") div?: ElementRef<HTMLDivElement>;

  @Input() heading: string = "";
  @Input() icon?: string;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateToggle();
    });
  }

  override quietUnselect(): void {
    super.quietUnselect();
    this.animateToggle();  
  }

  override quietSelect(): void {
    super.quietSelect();
    this.animateToggle();
  }

  animateToggle() {
    if (this.div == null) {
      console.error("it-accord: content element not found!");
    }

    if (this.selected) {
      this.div!.nativeElement.style.maxHeight = this.div!.nativeElement.scrollHeight + "px";
    } else {
      this.div!.nativeElement.style.maxHeight = "0px";
    }
  }
}
