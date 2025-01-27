import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ItSelectableComponent } from 'src/app/shared/components/display/it-selectable/it-selectable.component';

@Component({
  selector: 'it-selection-list',
  templateUrl: './it-selection-list.component.html'
})
export class ItSelectionListComponent implements AfterViewInit {
  
  /**
   * All direct or nested ItSelectableComponents.
   * Example for nested ItSelectableComponent: ItSipResultsComponent
   *
   * @type {QueryList<ItSelectableComponent>}
   */
  @ContentChildren(ItSelectableComponent) selectableContainers: QueryList<ItSelectableComponent> = null as any;

   /**
    * Maps and returns the ItSelectableComponents from the nested ContentChildren 
    *
    * @returns {ItSelectableComponent[]} All nested and unnested ItSelectableComponent found in the selectableComponents
    */
  get selectables() : ItSelectableComponent[] {
    return this.selectableContainers.toArray()
      .map(s => {
        if (!(s instanceof ItSelectableComponent)) {
          if (!!(s as any).selectable)
            return (s as any).selectable;
        } else {
          return s;
        }
      })
      .filter(s => !!s);
  }
  
  /**
   * Should user only be able to selct one object from the list
   *
   * @type {boolean}
   */
  @Input() singleSelect: boolean = true;
  @Input() initialSelection?: number;
  @Input() required: boolean = false;

  ngAfterViewInit(): void {
    this.mapSelectableIds();
    this.selectableContainers.changes
      .subscribe(() => {
        this.mapSelectableIds();
    });

    if ((this.initialSelection !== undefined && this.initialSelection <= this.selectables.length) || this.required) {
      // ToDo: Fix initial selection
      if (this.initialSelection === undefined) this.initialSelection = 0;
      const selectable = this.selectables[this.initialSelection];
      if (!!!selectable) return;
      selectable.select();
      selectable.detectChanges();
    }
  }

  mapSelectableIds() {
    this.selectables.map(s => s.id = this.selectables.indexOf(s));
  }

  onSelectionChanged(selectionId: number) {
    let selectable = this.selectables.find(s => s.id === selectionId)!;
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
