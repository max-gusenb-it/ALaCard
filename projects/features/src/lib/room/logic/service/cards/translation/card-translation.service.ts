import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Card, Utils, CardType, specificPlayerNameWhitecard, playerNameWhitecard } from "@shared";
import { CardState, CardUtils, MarkdownUtils, Player } from "@features";

@Injectable({
    providedIn: 'root'
})
export class CardTranslationService {
    get gameSipTextBreaker() {
        return "<br><br>\n\n";
    }

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

    getNewCardText(
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
        if (!Utils.isStringDefinedAndNotEmpty(card.settings?.sipText)) return;
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
        return this.formatCardText(card.settings!.sipText!, players, playerIDs, specificPlayerID);
    }

    getOfflineCardTextClasses() {
        return "text-xl"
    }
}