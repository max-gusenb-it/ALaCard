import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { ItTabComponent } from '../it-tab/it-tab.component';

@Component({
  selector: 'it-tab-group',
  templateUrl: './it-tab-group.component.html'
})
export class ItTabGroupComponent implements AfterContentInit {
  @ContentChildren(ItTabComponent) tabs: QueryList<ItTabComponent> = null as any;

  @Input() hideControls: boolean = false;
  @Input() advanceControlsEnabled: boolean = true;

  @Output() onStatusChange = new EventEmitter<boolean>();

  constructor() { }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: ItTabComponent) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    tab.active = true;
  }

  getActiveTabIndex() {
    const activeTab = this.tabs.filter(tab => tab.active);
    if (activeTab.length === 0) return;
    
    return this.tabs.toArray().indexOf(activeTab[0]);
  }

  isFirstTab() {
    return this.getActiveTabIndex() === 0;
  }

  nextTab() {
    const activeTabIndex = this.getActiveTabIndex();
    if (activeTabIndex == undefined) return;

    const tabs = this.tabs.toArray();

    if ((activeTabIndex + 1) >= tabs.length) {
      this.finishTabs();
    } else {
      this.selectTab(tabs[activeTabIndex + 1]);
    }
  }

  previousTab() {
    const activeTabIndex = this.getActiveTabIndex();
    if (activeTabIndex == undefined) return;

    if (this.isFirstTab()) {
      this.cancelTabs();
    } else {
      this.selectTab(this.tabs.toArray()[activeTabIndex - 1]);
    }
  }

  cancelTabs() {
    this.onStatusChange.emit(false);
  }

  finishTabs() {
    this.onStatusChange.emit(true);
  }
}
