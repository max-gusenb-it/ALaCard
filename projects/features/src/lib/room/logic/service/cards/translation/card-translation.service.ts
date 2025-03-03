import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Card, Utils, CardType } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class CardTranslationService {
    constructor(private translateService: TranslateService) { }

    getCardTitle(card: Card) {
        if (Utils.isStringDefinedAndNotEmpty(card.settings?.customTitle))
            return card.settings!.customTitle;
        switch(card.type) {
            case(CardType.GroundRule):
                return this.translateService.instant("features.room.game.card.groundRules");
            case(CardType.FreeText):
                return this.translateService.instant("features.room.game.card.freeText")
            case(CardType.PlayerVoting):
                return this.translateService.instant("features.room.game.card.playerVoting")
            case(CardType.TopicVotingCard):
                return this.translateService.instant("features.room.game.card.topic-voting")
            case(CardType.PollCard):
                return this.translateService.instant("features.room.game.card.poll")
            case(CardType.QuizCard):
                return this.translateService.instant("features.room.game.card.quiz")
        }
    }
}