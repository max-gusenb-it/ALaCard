import { Component, Input } from '@angular/core';

@Component({
  selector: 'it-chip',
  templateUrl: './it-chip.component.html'
})
export class ItChipComponent {

  // ToDo: Convert to ItSelectable

  @Input() selectable: boolean = false;
  @Input() selected: boolean = false;

  constructor() { }

  getState() {
    if (!this.selectable) return "default";
    else return this.selected ? "selected" : "unselected";
  }

  toggleState() {
    this.selected = !this.selected;
  }

}
