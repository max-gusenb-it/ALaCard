import { PollCard, PollResponse, Response, Card, PollCardResultConfig, Player, GameSettings, DynamicRoundData, SipResult, RoomSettings } from "src/app/core/models/interfaces";
import { BaseCardService } from "./base-card.service";
import { Injectable } from "@angular/core";
import { DynamicPollRoundData } from "src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-poll-card-round.data";
import { PollResult } from "src/app/core/models/interfaces/logic/cards/poll-card/poll-result";
import { defaultCardSips, pollCardSkipValue } from "src/app/core/constants/card";
import { Store } from "@ngxs/store";
import { RoomState } from "src/app/core/state";
import { ResponseDataDataService } from "../../data/response-data.data.service";
import { IngameDataDataService } from "../../data/ingame-data.data.service";
import { StaticRoundDataDataService } from "../../data/static-round-data.data.service";

@Injectable({
    providedIn: 'root'
})
export class PollCardService<C extends PollCard, S extends PollCardResultConfig> extends BaseCardService<PollCard, PollResponse, DynamicPollRoundData, PollResult, PollCardResultConfig> {

    constructor(
        private store: Store,
        responseDataDataService: ResponseDataDataService,
        ingameDataDataService: IngameDataDataService,
        staticRoundDataDataService: StaticRoundDataDataService
    ) {
        super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService);
    }

    get defaultPollVotingDistribution() {
        return true;
    }

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

    override getOfflineCardTextSizeClass(card: Card, text: string): string {
        return "text-base";
    }

    override createDynamicRoundData(roundId: number, responses: Response[]): DynamicPollRoundData {
        const pvResponses = this.castResponses(responses);
        let drd: DynamicPollRoundData = super.createDynamicRoundData(roundId, responses);
        drd.responses = pvResponses;
        return drd;
    }

    override getResults(dynamicRoundData: DynamicRoundData): PollResult[] {
        let results: PollResult[] = [];
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
            if (r2.subjectId === pollCardSkipValue) return -1;
            return r2.votes - r1.votes;
        });
        return results;
    }

    override isSplitCard(card: Card): boolean {
        return this.isSpecificSipSubjectIdDefined(card);
    }

    isSpecificSipSubjectIdDefined(card: Card) {
        const pollCard = this.castCard(card);
        const gameSettings = this.store.selectSnapshot(RoomState.gameSettings)!;
        const roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
        return gameSettings.drinkingGame && roomSettings.singleDeviceMode && pollCard.settings?.sipConfig?.specificSipSubjectId !== undefined;
    }

    override getSubCardCount(card: Card): number {
        if (this.isSplitCard(card)) return 2;
        else return super.getSubCardCount(card);
    }

    override calculateRoundSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const pollCard = this.castCard(card);
        let results: PollResult[] = [];

        if (pollCard.settings?.sipConfig?.specificSipSubjectId !== undefined) {
            results = this.getResults(dynamicRoundData)
                .filter(r => r.subjectId === pollCard.settings!.sipConfig!.specificSipSubjectId);
        }

        return results
            .map(r => {
                return r.playerIds.map(pId => {
                    return {
                        playerId: pId,
                        sips: defaultCardSips,
                        distribute: pollCard.settings?.sipConfig?.distribute !== undefined ?
                            pollCard.settings?.sipConfig?.distribute :
                            this.defaultPollVotingDistribution
                    } as SipResult
                });
            })
            .flat();
    }

    getTopResults(results: PollResult[]): PollResult[] {
        return results
            .filter(r => r.votes === results[0].votes && r.subjectId !== pollCardSkipValue);
    }
}