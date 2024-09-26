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
      // ToDo: Fix initial selection
      if (this.initialSelection === undefined) this.initialSelection = 0;
      const selectable = this.selectables.get(this.initialSelection);
      if (!!!selectable) return;
      selectable.select();
      selectable.detectChanges();
    }
  }

  onSelectionChanged(selectionId: number) {
    let selectable = this.selectables.get(selectionId)!;
    const numberOfSelectedItem = this.selectables.filter(s => s.selected).length;
    if (selectable.selected) {
      if (numberOfSelectedItem == 1) {
        return;
      }
      else {
        if (this.singleSelect) {
          this.selectables.filter(s => s.id !== selectionId).map(s => s.quietUnselect());
        }
      }
    } else {
      if (numberOfSelectedItem == 0) {
        if (this.required) {
          selectable.quietSelect();
        }
      }
    }
  }
}
