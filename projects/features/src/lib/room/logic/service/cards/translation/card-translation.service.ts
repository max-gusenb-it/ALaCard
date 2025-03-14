import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Card, Utils, CardType, specificPlayerNameWhitecard, playerNameWhitecard } from "@shared";
import { CardState, CardUtils, MarkdownUtils, Player } from "@features";

@Injectable({
    providedIn: 'root'
})
export class CardTranslationService {
    constructor(protected translateService: TranslateService) { }

    // ToDo: structure 
    getCardTitle(card: Card) {
        if (Utils.isStringDefinedAndNotEmpty(card.settings?.customTitle))
            return card.settings!.customTitle;
        switch(card.type) {
            case(CardType.GroundRule):
                return this.translateService.instant("features.room.game.card.groundRules");
            case(CardType.FreeText):
                return this.translateService.instant("features.room.game.card.freeText")
            case(CardType.Poll):
                return this.translateService.instant("features.room.game.card.poll")
            case(CardType.PlayerVoting):
                return this.translateService.instant("features.room.game.card.playerVoting")
            case(CardType.Quiz):
                return this.translateService.instant("features.room.game.card.quiz")
        }
    }

    getCardText(
        card: Card,
        players: Player[],
        playerIds: string[] = [],
        specificPlayerID?: string
    ): string {
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

    getOfflineCardText(
        card: Card,
        players: Player[],
        playerIds: string[] | undefined,
        specificPlayerID: string = "",
        isDrinkingGame: boolean,
        cardState: string = CardState.Card_Initial
    ): string {
        let text = this.getCardText(card, players, playerIds, specificPlayerID);

        const delaySipText = CardUtils.castCard<Card>(card).settings?.delaySipText;
        if (isDrinkingGame) {
            text += "<br><br>\n";
            if (delaySipText && cardState === CardState.Card_Initial) {
                text += MarkdownUtils.addTagToContent(
                    this.translateService.instant("features.room.game.game-cards.offline-sip-display.sips-on-next-card"),
                    "span",
                    ["text-base"]
                );
            } else {
                text += this.getCardDrinkingText(card)
            }
        }
        return text;
    }

    getCardDrinkingText(card: Card) : string {
        if (Utils.isStringDefinedAndNotEmpty(card.settings?.sipText)) {
            return card.settings!.sipText!;
        }
        return "";
    }

    getOfflineCardTextClasses() {
        return "text-xl"
    }
}