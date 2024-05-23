import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'it-tab',
  templateUrl: './it-tab.component.html',
  styleUrls: ['./it-tab.component.scss']
})
export class ItTabComponent {

  private _active: boolean = false;

  @HostBinding('hidden') public hidden: boolean = true;

  @Input() set active(value: boolean) {
    this._active = value;
    this.hidden = !value;
  }
  @Input() title: string = "Tab";

  get active() {
    return this._active;
  }
}
