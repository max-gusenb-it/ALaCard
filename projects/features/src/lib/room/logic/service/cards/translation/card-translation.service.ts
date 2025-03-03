import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Card, Utils, CardType, specificPlayerNameWhitecard, playerNameWhitecard } from "@shared";
import { Player, VotingResult } from "@features";

@Injectable({
    providedIn: 'root'
})
export class CardTranslationService<C extends Card> {
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

    getCardText(card: C, players: Player[], playerIds: string[] = [], specificPlayerID?: string): string {
        let text = card.text;

        if (card.text.includes(specificPlayerNameWhitecard)) {
            if (Utils.isStringDefinedAndNotEmpty(specificPlayerID)) {
                text = text.split(`${specificPlayerNameWhitecard}`).join(players.find(p => p.id === specificPlayerID)?.username);
            } else {
                text = text.replace(specificPlayerNameWhitecard, `${playerNameWhitecard}${playerIds.length - 1}`);
            }
        }

        if (playerIds.length > 0) {
            playerIds.forEach((playerId, index) => {
                text = text.split(`${playerNameWhitecard}${index}`).join(players.find(p => p.id === playerId)?.username);
            });
        }
        return text;
    }

    getResultsHeading(card: C, topResults: VotingResult[]) : string {
        return "";
    }
}