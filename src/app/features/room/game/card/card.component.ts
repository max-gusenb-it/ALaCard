import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { Color, supportedColors } from 'src/app/core/constants/color';
import { CardType } from 'src/app/core/models/enums';
import { Card, Player } from 'src/app/core/models/interfaces';
import { RoomState } from 'src/app/core/state';
import { CardUtils } from 'src/app/core/utils/card.utils';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends AngularLifecycle {

  players: Player[];

  @Input() card: Card;
  @Input() deckname: string = "";
  @Input() playerIds?: string[];
  @Input() customCardColor?: Color;
  @Input() customTitle?: string;
  @Input() hideDeckName?: boolean;

  @Output() onSwipe: EventEmitter<boolean> = new EventEmitter();
  @Output() onClick: EventEmitter<boolean> = new EventEmitter();

  touchStartX = 0;
  touchEndX = 0;

  constructor(
    private store: Store,
    private translateService: TranslateService
  ) {
    super();

    this.store.select(RoomState.players)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => this.players = p);
  }

  getBorderCSSClasses() {
    if (!!!this.customCardColor) {
      switch(this.card.type) {
        case(CardType.GroundRule):
        case(CardType.FreeText): {
          return "border-it_yellow-500 bg-it_yellow-500";
        };
        case(CardType.PlayerVoting): {
          return "border-red-500 bg-red-500"
        };
        case(CardType.TopicVotingCard): {
          return "border-blue-500 bg-blue-500"
        }
      }
    } else {
      switch(this.customCardColor) {
        case(supportedColors[0]): return "border-red-500 bg-red-500";
        case(supportedColors[1]): return "border-orange-500 bg-orange-500";
        case(supportedColors[2]): return "border-amber-500 bg-amber-500";
        case(supportedColors[3]): return "border-it_yellow-500 bg-it_yellow-500";
        case(supportedColors[4]): return "border-lime-500 bg-lime-500";
        case(supportedColors[5]): return "border-green-500 bg-green-500";
        case(supportedColors[6]): return "border-emerald-500 bg-emerald-500";
        case(supportedColors[7]): return "border-teal-500 bg-teal-500";
        case(supportedColors[8]): return "border-cyan-500 bg-cyan-500";
        case(supportedColors[9]): return "border-sky-500 bg-sky-500";
        case(supportedColors[10]): return "border-blue-500 bg-blue-500";
        case(supportedColors[11]): return "border-indigo-500 bg-indigo-500";
        case(supportedColors[12]): return "border-violet-500 bg-violet-500";
        case(supportedColors[13]): return "border-pink-500 bg-pink-500";
        case(supportedColors[14]): return "border-rose-500 bg-rose-500";
      }
    }
    return;
  }

  getTitleBackgroundCSSClasses() {
    if (!!!this.customCardColor) {
      switch(this.card.type) {
        case(CardType.GroundRule):
        case(CardType.FreeText): {
          return "bg-it_yellow-200";
        };
        case(CardType.PlayerVoting): {
          return "bg-red-200"
        };
        case(CardType.TopicVotingCard): {
          return "bg-blue-200"
        }
      }
    } else {
      switch(this.customCardColor) {
        case(supportedColors[0]): return "bg-red-200";
        case(supportedColors[1]): return "bg-orange-200";
        case(supportedColors[2]): return "bg-amber-200";
        case(supportedColors[3]): return "bg-it_yellow-200";
        case(supportedColors[4]): return "bg-lime-200";
        case(supportedColors[5]): return "bg-green-200";
        case(supportedColors[6]): return "bg-emerald-200";
        case(supportedColors[7]): return "bg-teal-200";
        case(supportedColors[8]): return "bg-cyan-200";
        case(supportedColors[9]): return "bg-sky-200";
        case(supportedColors[10]): return "bg-blue-200";
        case(supportedColors[11]): return "bg-indigo-200";
        case(supportedColors[12]): return "bg-violet-200";
        case(supportedColors[13]): return "bg-pink-200";
        case(supportedColors[14]): return "bg-rose-200";
      }
    }
    return;
  }

  getCardText() {
    return CardUtils.getCardService(this.card.type)
      .getCardText(
        this.card,
        this.store.selectSnapshot(RoomState.players),
        this.playerIds,
        this.store.selectSnapshot(RoomState.specificPlayerId),
    );
  }

  cardClicked(event: MouseEvent) {
    this.onClick.emit(event.clientX <= window.innerWidth / 2);
  }

  @HostListener('touchstart', ['$event']) handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event']) handleTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.checkDirection();
  }

  checkDirection() {
    if (this.touchEndX < this.touchStartX && (this.touchStartX - this.touchEndX) >= 100) this.onSwipe.emit(true);
    if (this.touchEndX > this.touchStartX && (this.touchEndX - this.touchStartX) >= 100) this.onSwipe.emit(false);
  }

  getCardTitle() {
    // ToDo: adapt string empty checks to this
    if (this.customTitle) return this.customTitle;
    switch (this.card.type) {
      case (CardType.GroundRule): {
        return this.translateService.instant("features.room.game.card.groundRules");
      };
      case (CardType.FreeText): {
        return this.translateService.instant("features.room.game.card.freeText");
      };
      case (CardType.PlayerVoting): {
        return this.translateService.instant("features.room.game.card.playerVoting");
      };
      case (CardType.TopicVotingCard): {
        return this.translateService.instant("features.room.game.card.topic-voting");
      };
    }
  }

}
