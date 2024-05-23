import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'it-button-heading',
  templateUrl: './it-button-heading.component.html'
})
export class ItButtonHeadingComponent {

  @Input() icon: string = "";

  @Output() click = new EventEmitter<any>();

  constructor() { }

}
