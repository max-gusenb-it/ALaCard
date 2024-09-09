import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CardType } from 'src/app/core/models/enums';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {

  @Input() cardType: CardType = CardType.FreeText;
  @Input() text: string = "";
  @Input() deckname: string = "";

  @Output() swipe: EventEmitter<boolean> = new EventEmitter();

  touchStartX = 0;
  touchEndX = 0;

  constructor(private translateService: TranslateService) { }

  @HostListener('touchstart', ['$event']) handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event']) handleTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.checkDirection();
  }

  checkDirection() {
    if (this.touchEndX < this.touchStartX) this.swipe.emit(true);
    if (this.touchEndX > this.touchStartX) this.swipe.emit(false);
  }

  getCardTitle() {
    switch(this.cardType) {
      case(CardType.GroundRule): {
        return this.translateService.instant("features.room.game.card.groundRules");
      };
      case(CardType.FreeText): {
        return this.translateService.instant("features.room.game.card.freeText");
      };
      case(CardType.PlayerVoting): {
        return this.translateService.instant("features.room.game.card.playerVoting");
      };
    }
  }

}
