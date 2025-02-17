import { PollCard, PollResponse, Response, Card, PollCardResultConfig, Player, GameSettings, DynamicRoundData, SipResult, RoomSettings } from "projects/app/src/app/core/models/interfaces";
import { BaseCardService } from "./base-card.service";
import { Injectable } from "@angular/core";
import { DynamicPollRoundData } from "projects/app/src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-poll-card-round.data";
import { PollResult } from "projects/app/src/app/core/models/interfaces/logic/cards/poll-card/poll-result";
import { defaultCardSips, pollCardSkipValue } from "projects/app/src/app/core/constants/card";
import { Store } from "@ngxs/store";
import { RoomState } from "projects/app/src/app/core/state";
import { ResponseDataDataService } from "../../data/response-data.data.service";
import { IngameDataDataService } from "../../data/ingame-data.data.service";
import { StaticRoundDataDataService } from "../../data/static-round-data.data.service";
import { CardStates } from "projects/app/src/app/core/models/interfaces/logic/cards/card-states";
import { PollCardStates } from "projects/app/src/app/core/models/interfaces/logic/cards/poll-card/poll-card-states";

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

    override hasFollowUpCard(card: Card, cardState: string): boolean {
        switch(cardState) {
            case(CardStates.card_initial): {
                return this.hasDefaultFollowUpCard(card) || super.hasFollowUpCard(card, cardState);
            }
            case(PollCardStates.pollCard_offlineSpecifcSipSubject): {
                return super.hasFollowUpCard(card, cardState);
            }
            default: return false;
        }
    }

    override hasDefaultFollowUpCard(card: Card) {
        const pollCard = this.castCard(card);
        const gameSettings = this.store.selectSnapshot(RoomState.gameSettings)!;
        const roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
        return gameSettings.drinkingGame && roomSettings.singleDeviceMode && pollCard.settings?.sipConfig?.specificSipSubjectId !== undefined;
    }

    override getNextCardState(): string {
        return PollCardStates.pollCard_offlineSpecifcSipSubject;
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