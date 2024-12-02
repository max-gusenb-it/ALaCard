import { Injectable } from "@angular/core";
import { PollCardService } from "./poll-card.service";
import { Card, DynamicRoundData, Player, Result, SipResult, TopicVotingResultConfig } from "src/app/core/models/interfaces";
import { PollResult } from "src/app/core/models/interfaces/logic/cards/poll-card/poll-result";
import { defaultCardSips, pollCardSkipValue } from "src/app/core/constants/card";
import { TranslateService } from "@ngx-translate/core";
import { TopicVotingCard } from "src/app/core/models/interfaces/logic/cards/topic-voting-card/topic-voting-card";
import { Utils } from "src/app/core/utils/utils";
import { TopicVotingGroup } from "src/app/core/models/enums";
import { Store } from "@ngxs/store";

@Injectable({
    providedIn: 'root'
})
export class TopicVotingCardService extends PollCardService<TopicVotingCard, TopicVotingResultConfig> {
    
    constructor(store: Store, private translateService: TranslateService) {
        super(store);
    }

    get defaultTopicVotingGroup() {
        return TopicVotingGroup.MostVoted;
    }

    get defaultTopicVotingDistribution() {
        return true;
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

    override getResultsHeading(results: PollResult[], card: Card): string {
        const castedCard: TopicVotingCard = this.castCard(card);
        const topResults = this.getTopResults(results);
        if (topResults.length > 0) {
            return Utils.addComaToStringArray(
                topResults.map(r => castedCard.subjects.find(s => r.subjectId === s.id)!.title),
                true
            );
        } else {
            return this.translateService.instant("features.room.game.game-cards.card-stats.skipped")
        }
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

    override calculateRoundSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const tvCard = this.castCard(card);

        let results : PollResult[] = [];
        if (tvCard.settings?.sipConfig?.specificSipSubjectId === undefined) {
            results = this.getResultGroup(dynamicRoundData, tvCard.settings?.sipConfig?.resultConfig);
        } else {
            results = this.getResults(dynamicRoundData)
                .filter(r => r.subjectId === tvCard.settings!.sipConfig!.specificSipSubjectId);
        }

        return results
            .map(r => {
                return r.playerIds.map(pId => {
                    return {
                        playerId: pId,
                        sips: defaultCardSips,
                        distribute: tvCard.settings?.sipConfig?.distribute !== undefined ? 
                            tvCard.settings?.sipConfig?.distribute : 
                            this.defaultTopicVotingDistribution
                    } as SipResult
                });
            })
            .flat();
    }

    override getResultGroup(dynamicRoundData: DynamicRoundData, resultConfig?: TopicVotingResultConfig) : PollResult[] {
        if (!!!resultConfig) resultConfig = {
            group: this.defaultTopicVotingGroup
        };

        const results = this.getResults(dynamicRoundData)
            .filter(r => r.subjectId !== pollCardSkipValue);

        let resultGroup: PollResult[] = [];
        if (results.length != 0) {
            let votes = 0;
            // ToDo: Generalize Reacurring stuff like MostVoted, LeastVoted
            switch(resultConfig.group) {
                case(TopicVotingGroup.MostVoted): {
                    votes = results[0].votes;
                    break;
                }
                case(TopicVotingGroup.LeastVoted): {
                    votes = results[results.length - 1].votes;
                    break;
                }
            }
            if (resultConfig.group === TopicVotingGroup.MostVoted) {
                votes = results[0].votes;
            } else {
                votes = results[results.length - 1].votes;
            }
            resultGroup = results
                .filter(r => r.votes === votes)
        }
        return resultGroup;
    }
}