import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { RoomState, CardServiceFactory, GameCardService, Player, SipResult, VotingCardTranslationService, VotingResult, playerVotingCardSkipValue } from '@features';
import { Card, VotingCard } from '@shared';

enum ResultType {
  VotingResult,
  SipResult
}

@Component({
  selector: 'it-result',
  templateUrl: './it-result.component.html',
  styleUrls: ['./it-result.component.scss']
})
export class ItResultComponent implements AfterViewInit {

  players: Player[];

  @Input() result: VotingResult;
  @Input() sipResult: SipResult;
  @Input() profilePicture?: string;
  @Input() title?: string;
  @Input() card: Card;
  @Input() overrideAnonymous: boolean = false;

  get skipped() {
    return this.result.subjectID === playerVotingCardSkipValue;
  }

  get cardService(): GameCardService {
    return this.cardServiceFactory.getCardService(this.card.type);
  }

  get cardTranslationService(): VotingCardTranslationService {
    return <VotingCardTranslationService>this.cardServiceFactory.getCardTranslationService(this.card.type);
  }

  constructor(
    private store: Store,
    private cardServiceFactory: CardServiceFactory,
    private translateService: TranslateService,
    private changeDetectornRef: ChangeDetectorRef
  ) {
    this.players = this.store.selectSnapshot(RoomState.players);
  }

  ngAfterViewInit(): void {
    if (!!this.card) {
      this.changeDetectornRef.detectChanges();
    }
  }

  get ResultType() {
    if (!!this.result && !!this.card)
      return ResultType.VotingResult
    if (!!this.sipResult)
      return ResultType.SipResult;
    return null;
  }

  getResultText() {
    switch(this.ResultType) {
      case(ResultType.VotingResult): {
        return this.cardTranslationService.getResultText(this.result);
      };
      case(ResultType.SipResult): {
        let text = this.sipResult.distribute ? 
          this.translateService.instant("shared.components.display.it-result.distribute") : 
          this.translateService.instant("shared.components.display.it-result.drink");
        text += ` ${this.sipResult.sips} `;
        text += this.sipResult.sips > 1 ? 
          this.translateService.instant("shared.components.display.it-result.sips") : 
          this.translateService.instant("shared.components.display.it-result.sip");
        return text;
      }
    }
  }

  cardHasResultSubText() {
    switch(this.ResultType) {
      case(ResultType.VotingResult): {
        return this.cardTranslationService.hasResultSubText(this.card, this.overrideAnonymous);
      }
    }
    return false;
  }

  getResultSubText() {
    return this.cardTranslationService.getResultSubText(this.result, this.players);
  }

}
