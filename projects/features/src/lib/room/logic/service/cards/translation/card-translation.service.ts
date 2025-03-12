import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Card, Utils, CardType, specificPlayerNameWhitecard, playerNameWhitecard } from "@shared";
import { Player } from "@features";

@Injectable({
    providedIn: 'root'
})
export class CardTranslationService<C extends Card> {
    constructor(protected translateService: TranslateService) { }

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
            case(CardType.Poll):
                return this.translateService.instant("features.room.game.card.poll")
            case(CardType.Quiz):
                return this.translateService.instant("features.room.game.card.quiz")
        }
    }

    getCardText(card: Card, players: Player[], playerIds: string[] = [], specificPlayerID?: string): string {
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

    getOfflineCardText(card: Card, players: Player[], playerIds: string[] = [], specificPlayerID: string = "", isDrinkingGame: boolean) {
        let text = this.getCardText(card, players, playerIds, specificPlayerID);
        if (isDrinkingGame) {
            text += "<br><br>\n\n" + this.getCardDrinkingText(card)
        }
        return text;
    }

    getCardDrinkingText(card: Card) : string {
        if (Utils.isStringDefinedAndNotEmpty(card.settings?.drinkingText)) {
            return card.settings!.drinkingText!;
        }
        return "";
    }

    getOfflineCardTextClasses() {
        return "text-xl"
    }
}