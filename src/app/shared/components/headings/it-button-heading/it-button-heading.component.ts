import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'it-button-heading',
  templateUrl: './it-button-heading.component.html'
})
export class ItButtonHeadingComponent {

  @Input() icon: string = "close";

  @Output() clicked = new EventEmitter<any>();

  constructor() { }

}
