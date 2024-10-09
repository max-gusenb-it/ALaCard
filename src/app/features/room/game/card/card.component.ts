import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
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
  @Input() playerIds: string[] | undefined;

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

  getCardText() {
    return CardUtils.getCardService(this.card.type)
      .getCardText(
        this.card,
        this.playerIds,
        this.players
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
    }
  }

}
