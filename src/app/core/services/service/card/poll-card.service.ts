import { Result, PollCard, PollResponse, Response, Card, DynamicRoundData, Player } from "src/app/core/models/interfaces";
import { BaseCardService } from "./base-card.service";
import { Injectable } from "@angular/core";
import { DynamicPollRoundData } from "src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-poll-card-round.data";
import { PollResult } from "src/app/core/models/interfaces/logic/cards/poll-card/poll-result";
import { pollCardSkipValue } from "src/app/core/constants/card";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class PollCardService extends BaseCardService<PollCard, PollResponse, DynamicPollRoundData, PollResult> {

    constructor(private translateService: TranslateService) {
        super();
    }

    override castCard(card: Card): PollCard {
        let pollCard = super.castCard(card);
        return {
            ...pollCard,
            subjects: pollCard.subjects.map((c, index) => {
                return {
                    id: index,
                    ...c
                }
            })
        }
    }

    override createDynamicRoundData(roundId: number, responses: Response[]): DynamicPollRoundData {
        const pvResponses = this.castResponses(responses);
        let drd : DynamicPollRoundData = super.createDynamicRoundData(roundId, responses);
        drd.responses = pvResponses;
        return drd;
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
}