import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ItSelectableComponent } from 'src/app/shared/components/display/it-selectable/it-selectable.component';

@Component({
  selector: 'it-selection-list',
  templateUrl: './it-selection-list.component.html'
})
export class ItSelectionListComponent implements AfterContentInit, AfterViewInit {
  @ContentChildren(ItSelectableComponent) selectables: QueryList<ItSelectableComponent> = null as any;
  
  /**
   * Should user only be able to selct one object from the list
   *
   * @type {boolean}
   */
  @Input() singleSelect: boolean = true;
  @Input() initialSelection?: number;
  @Input() required: boolean = false;

  ngAfterContentInit() {
    this.selectables.map(s => s.id = this.selectables.toArray().indexOf(s));
  }

  ngAfterViewInit(): void {
    if ((this.initialSelection !== undefined && this.initialSelection <= this.selectables.length) || this.required) {
      if (this.initialSelection === undefined) this.initialSelection = 0;
      const selectable = this.selectables.get(this.initialSelection);
      if (!!!selectable) return;
      selectable.select();
      selectable.detectChanges();
    }
  }

  onSelectionChanged(selectionId: number) {
    let selectable = this.selectables.get(selectionId)!;
    if (selectable.selected) {
      if (this.singleSelect && this.required) {
        return;
      }
      if (!this.singleSelect && this.required && this.selectables.filter(s => s.selected).length === 1) {
        return;
      }
      selectable.unselect();
    } else {
      if (this.singleSelect) {
        this.selectables.filter(s => s.id !== selectionId).map(s => s.unselect());
      }
      selectable.select();
    }
  }
}
