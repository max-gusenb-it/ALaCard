import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ItSelectableComponent } from 'src/app/shared/components/display/it-selectable/it-selectable.component';

@Component({
  selector: 'it-selection-list',
  templateUrl: './it-selection-list.component.html'
})
export class ItSelectionListComponent implements AfterContentInit {
  @ContentChildren(ItSelectableComponent) selectables: QueryList<ItSelectableComponent> = null as any;
  
  /**
   * Should user only be able to selct one object from the list
   *
   * @type {boolean}
   */
  @Input() singleSelect: boolean = true;

  ngAfterContentInit() {
    this.selectables.map(s => s.id = this.selectables.toArray().indexOf(s));
  }

  onSelectionChanged(selectionId: number) {
    if (this.singleSelect) {
      this.selectables.map(s => {
        if (s.id !== selectionId) s.unselect();
      });
    }
  }
}
