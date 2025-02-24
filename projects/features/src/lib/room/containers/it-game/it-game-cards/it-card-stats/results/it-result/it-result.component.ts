import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { RoomState, CardServiceFactory, GameCardService, Player, Result, SipResult } from '@features';
import { Card, CardType } from '@shared';

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

  players: Player[];

  @Input() result: Result;
  @Input() sipResult: SipResult;
  @Input() profilePicture?: string;
  @Input() title?: string;
  @Input() card: Card;
  @Input() overrideAnonymous: boolean = false;
  @Input() skipped: boolean = false;

  get cardService(): GameCardService {
    return this.cardServiceFactory.getCardService(this.card.type);
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

  // ToDo: structure: Move switch thingies into card services

  get ResultType() {
    if (!!this.result && !!this.card) {
      switch(this.card.type) {
        case(CardType.PlayerVoting): {
          return ResultType.PlayerVotingResult;
        }
        case(CardType.TopicVotingCard): {
          return ResultType.TopicVotingResult;
        }
        case(CardType.QuizCard): {
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
        return this.cardService.getResultText(this.result);
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
        return this.cardService.cardHasResultSubText(this.card, this.overrideAnonymous);
      }
    }
    return false;
  }

  getResultSubText() {
    return this.cardService.getResultSubText(this.result, this.players);
  }

}
