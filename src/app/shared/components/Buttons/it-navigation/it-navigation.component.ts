import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'it-navigation',
  templateUrl: './it-navigation.component.html',
})
export class ItNavigationComponent {
  @ViewChild("navigation") containerRef?: ElementRef<HTMLDivElement>;

  activeTab: string = "home";

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
