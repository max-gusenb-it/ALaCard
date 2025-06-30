import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input, QueryList, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { CardServiceFactory, DynamicRoundData, GameCardService, IngameDataDataService, SipResult } from '@features';
import { AngularLifecycle, Card, ItSelectableComponent, ItSelectionListComponent } from '@shared';

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

  get cardService(): GameCardService {
    return this.cardServiceFactory.getCardService(this.card.type);
  }

  dynamicRoundData: DynamicRoundData;

  sipResults: SipResult[] = [];

  get defaultVisibleSipResults() {
    return this.sipResults.slice(0, this.sipResultColumnCount);
  }

  get hiddenSipResults() {
    if (this.sipResults.length <= this.sipResultColumnCount) {
      return [];
    } else {
      return this.sipResults.slice(this.sipResultColumnCount, this.sipResults.length);
    }
  }

  get sipResultColumnCount() {
    if (window.innerWidth >= 380)
      return 5;
    else
      return 4;
  }

  constructor(
    private cardServiceFactory: CardServiceFactory,
    private ingameDataDataService: IngameDataDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(dynamicRoundData => {
        if (!dynamicRoundData) return;
        this.dynamicRoundData = dynamicRoundData;
        this.sipResults = this.cardService.getSipResults(this.card, this.dynamicRoundData);
        this.changeDetectorRef.detectChanges();
      });
  }
  
  getPlayerForSipResult(result: SipResult) {
    return this.cardService.getPlayerForSipResult(result);
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
