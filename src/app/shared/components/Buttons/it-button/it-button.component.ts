import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'it-button',
  templateUrl: './it-button.component.html',
  styleUrls: ['./it-button.component.scss'],
})
export class ItButtonComponent  implements OnInit {

  // ToDo: Fix button id's -> can't be the same

  @Input() color: "primary" | "secondary" | "tertiary" | "quaternary" | "red" | "blue" | "orange" | "green" = "primary";
  @Input() size: "big" | "small" = "big";
  @Input() type: "submit" | "button" = "submit";
  @Input() disabled = false;

  constructor() { }

  ngOnInit() {}

  getButtonClass() {
    return `${this.size}-button ${this.color}-button`;
  }
}
