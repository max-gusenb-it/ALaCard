import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CardType } from 'src/app/core/models/enums';
import { trigger, style, transition, animate } from "@angular/animations";

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(150%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('300ms ease-in', style({ transform: 'translateX(-150%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CardComponent {

  @Input() cardType: CardType = CardType.FreeText;
  @Input() text: string = "";
  @Input() deckname: string = "";

  @Output() swipe: EventEmitter<boolean> = new EventEmitter();

  @HostBinding('@slideIn') public slideIn = true;

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
    switch (this.cardType) {
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
