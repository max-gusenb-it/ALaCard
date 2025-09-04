import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Card, Utils, CardType, specificPlayerNameWhitecard, playerNameWhitecard } from "@shared";
import { CardUtils, Player } from "@features";
import { MarkdownPipe } from "projects/shared/src/lib/logic/pipes/markdown.pipe";

@Injectable({
    providedIn: 'root'
})
export class CardTranslationService {
    get markdownBreak() {
        return "<br><br>\n\n";
    }

    constructor(protected translateService: TranslateService, protected markdownPipe: MarkdownPipe) { }

    getCardTitle(card: Card, globalCardTitle?: string) {
        if (Utils.isStringDefinedAndNotEmpty(globalCardTitle ?? card.title))
            return globalCardTitle ?? card.title;
        switch(card.type) {
            case(CardType.GroundRule):
                return this.translateService.instant("features.room.game.card.groundRules");
            case(CardType.FreeText):
                return this.translateService.instant("features.room.game.card.freeText");
            case(CardType.PlayerVoting):
                return this.translateService.instant("features.room.game.card.playerVoting");
            case(CardType.Poll):
                return this.translateService.instant("features.room.game.card.poll");
            case(CardType.Quiz):
                return this.translateService.instant("features.room.game.card.quiz");
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
        isDrinkingGame: boolean,
        defaultSipText?: string
    ): string {
        let text = this.getGameText(card, players, playerIDs, specificPlayerID, cardState, isSingleDeviceMode);
        if (isDrinkingGame && isSingleDeviceMode) {
            const sipText = this.getSipText(card, players, playerIDs, specificPlayerID, cardState, defaultSipText);
            if (Utils.isStringDefinedAndNotEmpty(sipText)) text += this.markdownBreak + sipText;
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
        defaultSipText?: string
    ) {
        if (!Utils.isStringDefinedAndNotEmpty(card.sipText) && !Utils.isStringDefinedAndNotEmpty(defaultSipText)) return "";
        let text = "";
        if (card.settings?.delaySipText && CardUtils.isInitialCardState(cardState)) {
            return text;
        } else {
            text = this.formatCardText(card.sipText ?? defaultSipText!, players, playerIDs, specificPlayerID);
        }
        return text;
    }

    getTextCSSClasses(availableHeight: number, text: string) {
        const html = this.markdownPipe.transform(text)!.toString();

        const emptyLineRegex = new RegExp("<br><br>", "g");
        const breakRegex = new RegExp("(?<!<br>)<br>(?!<br>)", "g");
        const numerationRegex = new RegExp("<li\\b[^>]*>", "g");

        const emptyLinesCount = (html.match(emptyLineRegex) || []).length;
        const breaksCount = (html.match(breakRegex) || []).length;
        const numerationCount = (html.match(numerationRegex) || []).length;

        let letters = text.replace(new RegExp("<[^>]+>|\n", "g"), '');

        const breakValue = (breaksCount + numerationCount) * 0.5;
        const emptyLinesValue = emptyLinesCount * 1.3;
        const lettersValue = letters.length * 0.045;
        
        const totalValue = breakValue + emptyLinesValue + lettersValue;

        const fontFaktor = availableHeight / totalValue;
        if (fontFaktor <= 30) {
            return "text-base";
        } else if (fontFaktor <= 43) {
            return "text-lg";
        } else {
            return "text-xl";
        }
    }
}