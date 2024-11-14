import { Injectable } from "@angular/core";
import { PollCardService } from "./poll-card.service";
import { Card, DynamicRoundData, Player, Result, SipResult } from "src/app/core/models/interfaces";
import { PollResult } from "src/app/core/models/interfaces/logic/cards/poll-card/poll-result";
import { pollCardSkipValue } from "src/app/core/constants/card";
import { TranslateService } from "@ngx-translate/core";
import { TopicVotingCard } from "src/app/core/models/interfaces/logic/cards/topic-voting-card/topic-voting-card";

@Injectable({
    providedIn: 'root'
})
export class TopicVotingCardService extends PollCardService<TopicVotingCard> {
    
    constructor(private translateService: TranslateService) {
        super();
    }

    override getResults(dynamicRoundData: DynamicRoundData): PollResult[] {
        let results : PollResult[] = [];
        const dynamicPollRoundData = this.castDynamicRoundData(dynamicRoundData);
        dynamicPollRoundData.responses.forEach(response => {
            response.votedSubjectIds.forEach(subjectId => {
                let resultIndex = results.findIndex(r => r.subjectId === subjectId);
                if (resultIndex === -1) {
                    results.push({
                        subjectId: subjectId,
                        playerIds: [response.playerId],
                        votes: 1
                    })
                } else {
                    const foundResults = results[resultIndex];
                    results[resultIndex] = {
                        subjectId: subjectId,
                        playerIds: [
                            ...foundResults.playerIds,
                            response.playerId
                        ],
                        votes: foundResults.votes + 1
                    }
                }
            });
        });
        results = results.sort((r1, r2) => {
            if (r1.subjectId === pollCardSkipValue) return 1;
            if (r2.subjectId === pollCardSkipValue) return 1;
            return r2.votes - r1.votes;
        });
        return results;
    }

    override getResultText(result: Result): string {
        const pollResult = this.castResult(result);
        const translation = pollResult.votes === 1 ? this.translateService.instant("shared.components.display.it-result.vote") : this.translateService.instant("shared.components.display.it-result.votes");
        return `${pollResult.votes} ${translation}`;
    }

    override cardHasResultSubText(card: Card): boolean {
        const pollCard = this.castCard(card);
        if (pollCard.settings?.isAnonymous) return false;
        return true;
    }

    override getResultSubText(result: Result, players: Player[]): string {
        const pollResult = this.castResult(result);
        let text = "";
        pollResult.playerIds.forEach((playerId, index) => {
            text += players.find(p => p.id === playerId)!.username;
            if (index !== pollResult.playerIds.length -1) text += ", ";
        });
        return text;
    }

    override getSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        let sipResults: SipResult[] = this.calculateRoundSipResults(card, dynamicRoundData);
        return sipResults;
    }

    override calculateRoundSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        return[];
    }
}