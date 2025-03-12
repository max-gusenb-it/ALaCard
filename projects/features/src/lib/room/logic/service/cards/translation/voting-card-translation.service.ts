import { Injectable } from "@angular/core";
import { CardTranslationService, CardUtils, defaultCardSips, defaultVotingCardDistribution, defaultVotingCardGroup, MarkdownUtils, Player, playerVotingCardSkipValue, VotingResult } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Card, Subject, Utils, VotingCard, VotingCardGroup } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class VotingCardTranslationService<C extends VotingCard> extends CardTranslationService<VotingCard> {

    constructor(override translateService: TranslateService) {
        super(translateService);
    }

    get defaultSipDistributionGroup() : string {
        return defaultVotingCardGroup;
    }

    get defaultSipDistribution() {
        return defaultVotingCardDistribution;
    }

    getResultsHeading(subjects: Subject[], topResults: VotingResult[]) : string {
        if (topResults.length > 0) {
            return Utils.addComaToStringArray(
                topResults.map(r => subjects.find(s => r.subjectID === s.ID)!.title),
                    true
                );
        } else {
            return this.translateService.instant("features.room.game.game-cards.card-stats.skipped")
        }
    }

    getResultTitle(result: VotingResult, resultIndex: number, subjects: Subject[], topResults: VotingResult[]) : string {
        if (result.subjectID === playerVotingCardSkipValue) return this.translateService.instant("shared.components.display.it-result.skipped");
        const topResultCount = topResults.length;
        if (topResultCount === 1 && resultIndex === 0) return "";
        return subjects.find(s => s.ID === result.subjectID)!.title;
    }

    getResultText(result: VotingResult) {
        const translation = result.votes === 1 ? 
            this.translateService.instant("shared.components.display.it-result.vote") : 
            this.translateService.instant("shared.components.display.it-result.votes");
        return `${result.votes} ${translation}`;
    }

    hasResultSubText(card: Card, overrideAnonymous: boolean) {
        if (overrideAnonymous) return true;
        const votingCard = CardUtils.castCard<VotingCard>(card);
        if (votingCard.settings?.isAnonymous) return false
        return true;
    }

    getResultSubText(result: VotingResult, players: Player[]) {
        return Utils.addComaToStringArray(
            result.playerIDs
                .map(ID => players.find(p => p.id === ID)!.username),
            true
        );
    }

    override getCardDrinkingText(card: Card): string {
        if (Utils.isStringDefinedAndNotEmpty(card.settings?.drinkingText)) return super.getCardDrinkingText(card);

        let text = "";

        const votingCard = CardUtils.castCard<VotingCard>(card);
        const group = votingCard.settings?.sipConfig?.group ?? this.defaultSipDistributionGroup;

        text += this.getSipTextForGroup(group.toString()) + "<br>";
        text += votingCard.settings?.sipConfig?.distribute ?? this.defaultSipDistribution
            ? this.translateService.instant("shared.components.display.it-result.distribute") 
            : this.translateService.instant("shared.components.display.it-result.drink");
            
        text += " " + defaultCardSips + " " + this.translateService.instant("shared.components.display.it-result.sip")

        return MarkdownUtils.addTagToContent(text, "span", ["text-base"]);
    }

    getSipTextForGroup(group: string) {
        switch(group) {
            case(VotingCardGroup.VotingCard_MostVotedSubject): {
                return this.translateService.instant("features.room.game.game-cards.offline-sip-display.most-voted-topics");
            }
            case(VotingCardGroup.VotingCard_LeastVotedSubject): {
                return this.translateService.instant("features.room.game.game-cards.offline-sip-display.least-voted-topics");
            }
        }
    }
}