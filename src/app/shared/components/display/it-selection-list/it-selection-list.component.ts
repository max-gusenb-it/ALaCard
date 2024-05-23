import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Selectable } from 'src/app/shared/models/interfaces/display/Selectable';

@Component({
  selector: 'it-selection-list',
  templateUrl: './it-selection-list.component.html'
})
export class ItSelectionListComponent implements AfterContentInit {
  @ContentChildren(Selectable) selectables: QueryList<Selectable> = null as any;
  
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
