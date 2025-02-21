import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Color, LoadingState } from '@shared';

@Component({
  selector: 'it-button',
  templateUrl: './it-button.component.html',
  styleUrls: ['./it-button.component.scss'],
})
export class ItButtonComponent implements OnInit {
  @Input() color: "primary" | "secondary" | "tertiary" | "quaternary" | Color = "primary";
  @Input() size: "big" | "small" = "big";
  @Input() type: "submit" | "button" = "submit";
  @Input() disabled = false;
  @Input() indicateLoading = false;

  @Select(LoadingState.isLoading) isLoading$!: Observable<boolean>;

  constructor() { }

  ngOnInit() {}

  getButtonClass() {
    return `${this.size}-button ${this.color}-button`;
  }
}
