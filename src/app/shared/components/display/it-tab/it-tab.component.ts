import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'it-tab',
  templateUrl: './it-tab.component.html',
  styleUrls: ['./it-tab.component.scss']
})
export class ItTabComponent {

  private _active: boolean = false;

  @HostBinding('hidden') public hiddenBinding: boolean = true;

  @Input() set active(value: boolean) {
    this._active = value;
    this.hiddenBinding = !value;
  }
  @Input() title: string = "Tab";
  @Input() hidden: boolean = false;

  get active() {
    return this._active;
  }
}
