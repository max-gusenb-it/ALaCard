import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CardType } from 'src/app/core/models/enums';
import { Card } from 'src/app/core/models/interfaces';
import { CardUtils } from 'src/app/core/utils/card.utils';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() card: Card;
  @Input() deckname: string = "";

  @Output() onSwipe: EventEmitter<boolean> = new EventEmitter();
  @Output() onClick: EventEmitter<boolean> = new EventEmitter();

  touchStartX = 0;
  touchEndX = 0;

  constructor(private translateService: TranslateService) { }

  getCardText() {
    return CardUtils.getCardService(this.card.type).getCardText(this.card);
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
