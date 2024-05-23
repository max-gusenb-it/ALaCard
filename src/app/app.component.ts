import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ItNavigationComponent } from './shared/components/buttons/it-navigation/it-navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild(ItNavigationComponent) navigation?: ItNavigationComponent;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // after view init the scroll height of the navigation element changes and thus the padding of the router changes,
    // so change detection has to be triggered
    this.changeDetectorRef.detectChanges();
  }

  getNavigationHeight() {
    const navContainerElement = this.navigation?.containerRef?.nativeElement;
    if (!!navContainerElement) {
      let margin = window.getComputedStyle(navContainerElement).marginBottom;
      return navContainerElement.scrollHeight + (!!margin ? parseInt(margin.replace('px', '')) : 0);
    } else {
      return 0;
    }
  }
}
