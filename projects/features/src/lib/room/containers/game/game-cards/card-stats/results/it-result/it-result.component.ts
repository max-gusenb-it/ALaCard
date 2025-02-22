import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { RoomState, CardService, GameCardService, Player } from '@features';
import { Card, CardType, Result, SipResult } from '@shared';

enum ResultType {
  PlayerVotingResult,
  TopicVotingResult,
  SipVotingResult
}

@Component({
  selector: 'it-result',
  templateUrl: './it-result.component.html',
  styleUrls: ['./it-result.component.scss']
})
export class ItResultComponent implements AfterViewInit {

  baseCardService: GameCardService;
  players: Player[];

  @Input() result: Result;
  @Input() sipResult: SipResult;
  @Input() profilePicture?: string;
  @Input() title?: string;
  @Input() card: Card;
  @Input() overrideAnonymous: boolean = false;
  @Input() skipped: boolean = false;

  constructor(
    private store: Store,
    private cardService: CardService,
    private translateService: TranslateService,
    private changeDetectornRef: ChangeDetectorRef
  ) {
    this.players = this.store.selectSnapshot(RoomState.players);
  }

  ngAfterViewInit(): void {
    if (!!this.card) {
      this.baseCardService = this.cardService.getCardService(this.card.type);
      this.changeDetectornRef.detectChanges();
    }
  }

  get ResultType() {
    if (!!this.result && !!this.card) {
      switch(this.card.type) {
        case(CardType.PlayerVoting): {
          return ResultType.PlayerVotingResult;
        }
        case(CardType.TopicVotingCard): {
          return ResultType.TopicVotingResult;
        }
      }
    }
    if (!!this.sipResult) {
      return ResultType.SipVotingResult;
    }
    return null;
  }

  getTitle() {
    switch(this.ResultType) {
      case(ResultType.PlayerVotingResult):
      case(ResultType.TopicVotingResult): {
        return !this.skipped ? 
          this.title : 
          this.translateService.instant("shared.components.display.it-result.skipped");
      };
      case(ResultType.SipVotingResult): {
        return this.title;
      }
    }
  }


  getResultText() {
    switch(this.ResultType) {
      case(ResultType.PlayerVotingResult):
      case(ResultType.TopicVotingResult): {
        return this.baseCardService.getResultText(this.result);
      };
      case(ResultType.SipVotingResult): {
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
      case(ResultType.PlayerVotingResult):
      case(ResultType.TopicVotingResult): {
        return this.baseCardService.cardHasResultSubText(this.card, this.overrideAnonymous);
      }
    }
    return false;
  }

  getResultSubText() {
    return this.baseCardService.getResultSubText(this.result, this.players);
  }

}
