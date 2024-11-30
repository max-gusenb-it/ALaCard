import { PollCard, PollResponse, Response, Card, PollCardResultConfig } from "src/app/core/models/interfaces";
import { BaseCardService } from "./base-card.service";
import { Injectable } from "@angular/core";
import { DynamicPollRoundData } from "src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-poll-card-round.data";
import { PollResult } from "src/app/core/models/interfaces/logic/cards/poll-card/poll-result";
import { pollCardSkipValue } from "src/app/core/constants/card";

@Injectable({
    providedIn: 'root'
})
export class PollCardService<C extends PollCard, S extends PollCardResultConfig> extends BaseCardService<PollCard, PollResponse, DynamicPollRoundData, PollResult, PollCardResultConfig> {
    override castCard(card: Card): C {
        let pollCard = super.castCard(card);
        return <C>{
            ...pollCard,
            subjects: pollCard.subjects.map((c, index) => {
                return {
                    id: index,
                    ...c
                }
            })
        };
    }

    override createDynamicRoundData(roundId: number, responses: Response[]): DynamicPollRoundData {
        const pvResponses = this.castResponses(responses);
        let drd : DynamicPollRoundData = super.createDynamicRoundData(roundId, responses);
        drd.responses = pvResponses;
        return drd;
    }

    getTopResults(results: PollResult[]) : PollResult[] {
        return results
            .filter(r => r.votes === results[0].votes && r.subjectId !== pollCardSkipValue);
    }
}