import { Component } from '@angular/core';

@Component({
  selector: 'it-navigation',
  templateUrl: './it-navigation.component.html',
})
export class ItNavigationComponent {

  activeTab: string = "home";

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
