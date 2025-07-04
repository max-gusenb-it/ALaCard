import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Card, Utils, CardType, specificPlayerNameWhitecard, playerNameWhitecard } from "@shared";
import { CardUtils, MarkdownUtils, Player } from "@features";

@Injectable({
    providedIn: 'root'
})
export class CardTranslationService {
    get gameSipTextBreaker() {
        return "<br><br>\n\n";
    }

    constructor(protected translateService: TranslateService) { }

    getCardTitle(card: Card) {
        if (Utils.isStringDefinedAndNotEmpty(card.title))
            return card.title;
        switch(card.type) {
            case(CardType.GroundRule):
                return this.translateService.instant("features.room.game.card.groundRules");
            case(CardType.FreeText):
                return this.translateService.instant("features.room.game.card.freeText");
        }
    }

    formatCardText(
        text: string,
        players: Player[],
        playerIds: string[] = [],
        specificPlayerID?: string
    ): string {
        if (text.includes(specificPlayerNameWhitecard)) {
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

    getCardText(
        card: Card,
        players: Player[],
        playerIDs: string[],
        specificPlayerID: string,
        cardState: string,
        isSingleDeviceMode: boolean,
        isDrinkingGame: boolean
    ): string {
        let text = this.getGameText(card, players, playerIDs, specificPlayerID, cardState, isSingleDeviceMode);
        if (isDrinkingGame) {
            const sipText = this.getSipText(card, players, playerIDs, specificPlayerID, cardState, isSingleDeviceMode);
            if (Utils.isStringDefinedAndNotEmpty(sipText)) text += this.gameSipTextBreaker + sipText;
        }
        return text;
    }

    getGameText(
        card: Card,
        players: Player[],
        playerIDs: string[],
        specificPlayerID: string,
        cardState: string,
        isSingleDeviceMode: boolean
    ) {
        return this.formatCardText(card.text, players, playerIDs, specificPlayerID);
    }

    getSipText(
        card: Card,
        players: Player[],
        playerIDs: string[] = [],
        specificPlayerID: string = "",
        cardState: string,
        isSingleDeviceMode: boolean = false
    ) {
        if (!Utils.isStringDefinedAndNotEmpty(card.sipText)) return;
        if (card.settings?.delaySipText && CardUtils.isInitialCardState(cardState)) {
            if (isSingleDeviceMode) {
                return MarkdownUtils.addTagToContent(
                    this.translateService.instant("features.room.game.game-cards.offline-sip-display.sips-on-next-card"),
                    "span",
                    ["text-base"]
                );
            } else {
                return "";
            }
        }
        return this.formatCardText(card.sipText!, players, playerIDs, specificPlayerID);
    }

    getOfflineCardTextClasses() {
        return "text-xl"
    }
}