import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input, QueryList, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { AngularLifecycle, Card, SipResult, ItSelectableComponent, ItSelectionListComponent } from '@shared';
import { CardService, DynamicRoundData, GameCardService, IngameDataDataService } from '@features';

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
export class ItSipResultsComponent extends AngularLifecycle implements AfterViewInit {
  
  // Create template for provider & viewChild if ever needed again
  @ViewChild(ItSelectableComponent) selectable: QueryList<ItSelectableComponent> = null as any;

  @Input() selectionList: ItSelectionListComponent;
  @Input() card: Card;

  dynamicRoundData: DynamicRoundData;
  gameCardService: GameCardService;

  sipResults: SipResult[] = [];

  get defaultVisibleSipResults() {
    return this.sipResults.slice(0, this.sipResultColumnCount);
  }

  get hiddenSipResults() {
    if (this.sipResults.length <= this.sipResultColumnCount) {
      return [];
    } else {
      return this.sipResults.slice(this.sipResultColumnCount + 1, this.sipResults.length - 1);
    }
  }

  get sipResultColumnCount() {
    if (window.innerWidth >= 380)
      return 5;
    else
      return 4;
  }

  constructor(
    private cardService: CardService,
    private ingameDataDataService: IngameDataDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.gameCardService = this.cardService.getCardService(this.card.type);
    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(dynamicRoundData => {
        if (!dynamicRoundData) return;
        this.dynamicRoundData = dynamicRoundData;
        this.sipResults = this.gameCardService.getSipResults(this.card, this.dynamicRoundData);
        this.changeDetectorRef.detectChanges();
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
