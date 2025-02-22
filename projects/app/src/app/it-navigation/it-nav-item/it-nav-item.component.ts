import { Component, Input } from '@angular/core';

@Component({
  selector: 'it-nav-item',
  templateUrl: './it-nav-item.component.html',
})
export class ItNavItemComponent {
  @Input() label: string = "label"; 
  @Input() icon: string = "home";
  @Input() activeRoute: string = "";
  @Input() route: string = "";

  isActive() {
    return this.route === this.activeRoute;
  }
}
