import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { ItAccordComponent } from '../it-accord/it-accord.component';

@Component({
  selector: 'it-accordion',
  templateUrl: './it-accordion.component.html'
})
export class ItAccordionComponent implements AfterContentInit {
  @ContentChildren(ItAccordComponent) accords: QueryList<ItAccordComponent> = null as any;

  activeAccordId: number = 0;

  constructor() { }
  
  ngAfterContentInit(): void {
    this.accords.map(a => a.id = this.accords.toArray().indexOf(a));
  }

  onAccordActivated(id: number) {
    this.accords.map(a => a.activeAccordId = id);
    this.activeAccordId = id;
  }
}
