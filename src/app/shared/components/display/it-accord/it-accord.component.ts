import { AfterViewInit, Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { Selectable } from 'src/app/shared/models/interfaces/display/Selectable';

@Component({
  selector: 'it-accord',
  templateUrl: './it-accord.component.html',
  providers: [{provide: Selectable, useExisting: forwardRef(() => ItAccordComponent)}]
})
export class ItAccordComponent extends Selectable implements AfterViewInit {

  @ViewChild("content") div?: ElementRef<HTMLDivElement>;

  @Input() heading: string = "";
  @Input() icon?: string;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateToggle();
    });
  }

  override unselect(): void {
    super.unselect();
    this.animateToggle();  
  }

  override select(): void {
    super.select();
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
