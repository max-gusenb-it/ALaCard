import { Component, Input, OnInit } from '@angular/core';

type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "medium" | "large";

@Component({
  selector: 'it-icon-button',
  templateUrl: './it-icon-button.component.html',
  styleUrls: ['./it-icon-button.component.scss'],
})
export class ItIconButtonComponent  implements OnInit {
  @Input() type: ButtonType = "primary";
  @Input() size: ButtonSize = "small";
  @Input() color: string = "";

  constructor() { }

  ngOnInit() {}

  getColor() {
    if (!!!this.color) {
      return this.type !== 'secondary' ? 'text-neutral-900' : 'text-neutral-100'
    } else {
      return this.color;
    }
  }

}
