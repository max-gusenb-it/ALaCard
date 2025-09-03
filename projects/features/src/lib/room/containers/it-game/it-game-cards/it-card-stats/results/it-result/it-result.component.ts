import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { RoomState, CardServiceFactory, GameCardService, Player, VotingCardTranslationService, VotingResult, votingCardSkipValue } from '@features';
import { Card } from '@shared';

enum ResultType {
  VotingResult
}

@Component({
  selector: 'it-result',
  templateUrl: './it-result.component.html',
  styleUrls: ['./it-result.component.scss']
})
export class ItResultComponent implements AfterViewInit {

  players: Player[];

  @Input() result: VotingResult;
  @Input() profilePicture?: string;
  @Input() title?: string;
  @Input() card: Card;
  @Input() overrideAnonymous: boolean = false;

  get skipped() {
    return this.result.subjectID === votingCardSkipValue;
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
    return null;
  }

  getResultText() {
    switch(this.ResultType) {
      case(ResultType.VotingResult): {
        return this.cardTranslationService.getResultText(this.result);
      };
      default: return "";
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
