import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'it-button',
  templateUrl: './it-button.component.html',
  styleUrls: ['./it-button.component.scss'],
})
export class ItButtonComponent  implements OnInit {

  @Input() type: "primary" | "secondary" | "tertiary" | "quaternary" | "red" | "blue" | "orange" | "green" = "primary";
  @Input() size: "big" | "small" = "big";

  constructor() { }

  ngOnInit() {}

  getButtonId() {
    return `${this.type}-button`
  }

  getButtonClass() {
    return `${this.size}-button`;
  }
}
