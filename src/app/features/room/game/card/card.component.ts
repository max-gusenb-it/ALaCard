import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CardType } from 'src/app/core/models/enums';

@Component({
  selector: 'card',
  templateUrl: './card.component.html'
})
export class CardComponent {

  @Input() cardType: CardType = CardType.FreeText;
  @Input() deckname: string = "";

  constructor(private translateService: TranslateService) { }

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
