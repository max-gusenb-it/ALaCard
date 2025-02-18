import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { Deck } from 'projects/app/src/app/core/models/interfaces';
import { ItSelectableComponent } from '../../../components/forms/it-selectable/it-selectable.component';

@Component({
  selector: 'it-deck',
  templateUrl: './it-deck.component.html',
  providers: [{provide: ItSelectableComponent, useExisting: forwardRef(() => ItDeckComponent)}],
})
export class ItDeckComponent extends ItSelectableComponent {
  @ViewChild("chipContainer") chipContainer?: ElementRef<HTMLDivElement>;

  @Input() deck: Deck;

  override quietUnselect(): void {
    super.quietUnselect();
    this.animateToggle();  
  }

  override quietSelect(): void {
    super.quietSelect();
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