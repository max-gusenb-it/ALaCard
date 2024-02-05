import { Component, Input, OnInit } from '@angular/core';
import { IconColor } from 'src/app/shared/models/components/IconColor';

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
  @Input() color: IconColor = null as any;

  constructor() { }

  ngOnInit() {}

  getColor() {
    if (this.color === null) {
      return this.type !== 'secondary' ? 'dark' : 'white'
    } else {
      return this.color;
    }
  }

}
