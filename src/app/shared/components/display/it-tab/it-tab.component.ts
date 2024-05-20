import { Component, Input } from '@angular/core';

@Component({
  selector: 'it-tab',
  templateUrl: './it-tab.component.html'
})
export class ItTabComponent {
  @Input() active: boolean = false;
  @Input() title: string = "Tab";
}
