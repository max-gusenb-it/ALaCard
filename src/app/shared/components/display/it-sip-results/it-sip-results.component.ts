import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, HostListener, Input, QueryList, ViewChild } from '@angular/core';
import { ItSelectionListComponent } from '../it-selection-list/it-selection-list.component';
import { ItSelectableComponent } from '../it-selectable/it-selectable.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Card, DynamicRoundData, SipResult } from 'src/app/core/models/interfaces';
import { CardService, GameCardService } from 'src/app/core/services/service/card/card.service';

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
export class ItSipResultsComponent implements AfterViewInit {
  
  // Create template for provider & viewChild if ever needed again
  @ViewChild(ItSelectableComponent) selectable: QueryList<ItSelectableComponent> = null as any;

  @Input() selectionList: ItSelectionListComponent;
  @Input() card: Card;
  @Input() dynamicRoundData: DynamicRoundData;

  gameCardService: GameCardService;
  isInWidthRange?: boolean = undefined;

  sipResults: SipResult[];
  defaultVisibleSipResults: SipResult[];
  hiddenSipResults: SipResult[];

  get sipResultColumnCount() {
    if (window.innerWidth >= 380)
      return 5;
    else
      return 4;
  }

  constructor(
    private cardService: CardService,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.gameCardService = this.cardService.getCardService(this.card.type);
    this.sipResults = this.gameCardService.getNewSeperatedSipResults(this.card, this.dynamicRoundData);

    this.breakpointObserver.observe("(max-width: 380px)")
      .subscribe((result: BreakpointState) => {
        if (!!!this.isInWidthRange || this.isInWidthRange != result.matches) {
          let sipResultsCopy = this.sipResults.slice();
          this.defaultVisibleSipResults = sipResultsCopy.splice(0, this.sipResultColumnCount);
          this.hiddenSipResults = sipResultsCopy;
          this.changeDetectorRef.detectChanges();

          this.isInWidthRange = result.matches;
        }
    });
  }
  
  getPlayerForSipResult(result: SipResult) {
    return this.gameCardService.getPlayerForSipResult(result);
  }

  /**
   * Checks, how many sip results would be needed to fill up a row.
   *
   * @returns An array containing the amount needed to fill up the sip result row with number values
   */
  getMissingRowElements(sipResults?: SipResult[]) : number[] {
    let missingRowElementCount = this.sipResultColumnCount;
    if (!!sipResults) {
      if (sipResults.length < this.sipResultColumnCount) {
        missingRowElementCount = this.sipResultColumnCount - sipResults.length;
      } else {
        missingRowElementCount = sipResults.length - Math.trunc(sipResults.length / this.sipResultColumnCount) * this.sipResultColumnCount;
      }
    }
    return Array.from(Array(missingRowElementCount).keys());
  }

}
