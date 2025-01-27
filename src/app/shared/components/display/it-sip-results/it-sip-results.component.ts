import { Component, forwardRef, Input, QueryList, ViewChild } from '@angular/core';
import { ItSelectionListComponent } from '../it-selection-list/it-selection-list.component';
import { ItSelectableComponent } from '../it-selectable/it-selectable.component';

@Component({
  selector: 'it-sip-results',
  templateUrl: './it-sip-results.component.html',
  providers: [
    {
      provide: ItSelectableComponent,
      useExisting: forwardRef(() => ItSipResultsComponent)
    }
  ]
})
export class ItSipResultsComponent {
  
  // Create template for provider & viewChild if ever needed again
  @ViewChild(ItSelectableComponent) selectable: QueryList<ItSelectableComponent> = null as any;

  @Input() selectionList: ItSelectionListComponent;

  constructor() { }

}
