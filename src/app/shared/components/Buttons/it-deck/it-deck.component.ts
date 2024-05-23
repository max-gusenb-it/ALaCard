import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { ItSelectableComponent } from 'src/app/shared/components/display/it-selectable/it-selectable.component';

@Component({
  selector: 'it-deck',
  templateUrl: './it-deck.component.html',
  providers: [{provide: ItSelectableComponent, useExisting: forwardRef(() => ItDeckComponent)}],
})
export class ItDeckComponent extends ItSelectableComponent {
  @ViewChild("chipContainer") chipContainer?: ElementRef<HTMLDivElement>;

  @Input() title: string = null as any;
  @Input() cardCount: number = 0;
  @Input() description: string = null as any;
  @Input() icon: string = null as any;
  @Input() flags: string[] = [];

  override unselect(): void {
    super.unselect();
    this.animateToggle();  
  }

  override select(): void {
    super.select();
    this.animateToggle();
  }

  animateToggle() {
    if (this.chipContainer == null) {
      console.error("it-deck: chips element not found!");
    }

    if (this.selected) {
      this.chipContainer!.nativeElement.style.maxHeight = this.chipContainer!.nativeElement.scrollHeight + "px";
    } else {
      this.chipContainer!.nativeElement.style.maxHeight = "0px";
    }
  }

}