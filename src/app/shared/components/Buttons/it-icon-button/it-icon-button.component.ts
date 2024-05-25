import { Component, Input, OnInit } from '@angular/core';

type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "medium" | "large";

@Component({
  selector: 'it-icon-button',
  templateUrl: './it-icon-button.component.html',
  styleUrls: ['./it-icon-button.component.scss'],
})
export class ItIconButtonComponent  implements OnInit {
  @Input() type: "button" | "menu" | "reset" | "submit" = "button";
  @Input() color: ButtonType = "primary";
  @Input() size: ButtonSize = "small";
  @Input() iconColor: string = "";
  @Input() iconSize: number = 0;

  constructor() { }

  ngOnInit() {}

  getColor() {
    if (!!!this.iconColor) {
      return this.color !== 'secondary' ? 'text-neutral-900' : 'text-neutral-100'
    } else {
      return this.iconColor;
    }
  }

}
