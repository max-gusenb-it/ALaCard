import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { Utils } from "projects/shared/src/lib/utils/utils/utils";
import { 
    RoomState,
    IngameDataDataService,
    ResponseDataDataService,
    StaticRoundDataDataService,
    MarkdownUtils,
    Player,
    PlayerVotingResponse,
    Response,
    DynamicPlayerVotingRoundData,
    DynamicRoundData,
    defaultCardSips,
    defaultPayToDisplaySips,
    playerVotingCardSkipValue,
    GameSettings,
    Result,
    SipResult,
    PlayerVotingResult,
    CardService,
    GroupUtils
} from "@features";
import { 
    PlayerVotingCard,
    VotingCardGroup,
    PlayerVotingResultConfig,
    Card,
    AuthenticationState,
} from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingCardService extends CardService<PlayerVotingCard, PlayerVotingResponse, DynamicPlayerVotingRoundData, PlayerVotingResult, PlayerVotingResultConfig> {

    constructor(
        private store: Store,
        responseDataDataService: ResponseDataDataService,
        ingameDataDataService: IngameDataDataService,
        staticRoundDataDataService: StaticRoundDataDataService,
        override translateService: TranslateService
    ) {
        super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService, translateService);
    }

    get defaultPlayerVotingGroup() {
        return VotingCardGroup.MostVoted;
    }

    override createDynamicRoundData(roundId: number, responses: Response[]): DynamicPlayerVotingRoundData {
        const pvResponses = this.castResponses(responses);
        let drd : DynamicPlayerVotingRoundData = super.createDynamicRoundData(roundId, responses);
        drd.responses = pvResponses;
        return drd;
    }

    override getResults(dynamicRoundData: DynamicRoundData): PlayerVotingResult[] {
        let results : PlayerVotingResult[] = [];
        const pvDynamicRoundData = this.castDynamicRoundData(dynamicRoundData);
        pvDynamicRoundData.responses.forEach(response => {
            let resultIndex = results.findIndex(r => r.subjectID === response.votedPlayerId);
            if (resultIndex === -1) {
                results.push({
                    subjectID: response.votedPlayerId,
                    playerIDs: [response.playerId],
                    votes: 1
                })
            } else {
                const foundResults = results[resultIndex];
                results[resultIndex] = {
                    subjectID: foundResults.subjectID,
                    playerIDs: [
                        ...foundResults.playerIDs,
                        response.playerId
                    ],
                    votes: foundResults.votes + 1
                }
            }
        });
        results = results.sort((r1, r2) => {
            if (r1.subjectID === playerVotingCardSkipValue) return 1;
            if (r2.subjectID === playerVotingCardSkipValue) return -1;
            return r2.votes - r1.votes;
        });
        return results;
    }

    override getResultsHeading(results: PlayerVotingResult[]): string {
        const players = this.store.selectSnapshot(RoomState.players);
        const topResults = results
            .filter(r => r.votes === results[0].votes && r.subjectID !== playerVotingCardSkipValue);
        if (topResults.length > 0) {
            return Utils.addComaToStringArray(
                topResults.map(r => players.find(p => r.subjectID === p.id)!.username),
                true
            );
        } else {
            return this.translateService.instant("features.room.game.game-cards.card-stats.skipped")
        }
    }

    override getResultText(result: Result): string {
        const pvResult = this.castResult(result);
        const translation = pvResult.votes === 1 ? this.translateService.instant("shared.components.display.it-result.vote") : this.translateService.instant("shared.components.display.it-result.votes");
        return `${pvResult.votes} ${translation}`;
    }

    override cardHasResultSubText(card: Card, overwriteAnonymous: boolean = false): boolean {
        const pvCard = this.castCard(card);
        if (pvCard.settings?.isAnonymous && !overwriteAnonymous) return false;
        return true;
    }

    override getResultSubText(result: Result, players: Player[]): string {
        const pvResult = this.castResult(result);
        let text = "";
        pvResult.playerIDs.forEach((playerId, index) => {
            text += players.find(p => p.id === playerId)!.username;
            if (index !== pvResult.playerIDs.length -1) text += ", ";
        });
        return text;
    }

    override getOfflineCardText(card: Card, players: Player[], playerIds: string[] | undefined, speficPlayerId: string | undefined, gameSettings: GameSettings): string {
        let text = this.getCardText(card, players, playerIds, speficPlayerId);
        if (gameSettings.drinkingGame) {
            text += "<br><br>\n";
            let sipText = "";

            const castedCard = this.castCard(card);
            const group = castedCard.settings?.sipConfig?.group ?? this.defaultPlayerVotingGroup;
            switch(group) {
                case(VotingCardGroup.MostVoted): {
                    sipText = this.translateService.instant("features.room.game.game-cards.offline-sip-display.most-voted-player");
                } break;
                case(VotingCardGroup.LeastVoted): {
                    sipText = this.translateService.instant("features.room.game.game-cards.offline-sip-display.least-voted-player");
                }
            }
            sipText += "<br>";
            sipText += this.translateService.instant("features.room.game.game-cards.offline-sip-display.drink-sips", {
                sipCount: defaultCardSips,
                sips: this.translateService.instant("shared.components.display.it-result.sip")
            })
            text += MarkdownUtils.addTagToContent(sipText, "span", ["text-sm"])
        }
        return text;
    }

    override getSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        let sipResults = this.calculateSipResults(card, dynamicRoundData);
        
        // Pay To Disply Sip Calculation
        const dynamicPlayerVotingRoundData = this.castDynamicRoundData(dynamicRoundData);
        if (!!dynamicPlayerVotingRoundData.payToDisplayPlayerId) {
            const payToWinUserIndex = sipResults.findIndex(sr => sr.playerId === dynamicPlayerVotingRoundData.payToDisplayPlayerId && !sr.distribute);
            if (payToWinUserIndex !== -1) {
                sipResults[payToWinUserIndex].sips += defaultPayToDisplaySips
            } else {
                sipResults = [
                    ...sipResults,
                    {
                        playerId: dynamicPlayerVotingRoundData.payToDisplayPlayerId,
                        sips: defaultPayToDisplaySips,
                        distribute: false
                    }
                ]
            }
        }
        
        return sipResults.sort((s1, s2) => {
            if (s1.playerId === this.store.selectSnapshot(AuthenticationState.userId)) return -1;
            if (s2.playerId !== this.store.selectSnapshot(AuthenticationState.userId)) return 1;
            return 0;
        });
    }
    
    override calculateSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const pvCard = this.castCard(card);

        const filteredResults = GroupUtils.getResultsForGroup(
            this.getResults(dynamicRoundData)
                .filter(r => r.subjectID !== playerVotingCardSkipValue),
            pvCard.settings?.sipConfig?.group ?? this.defaultPlayerVotingGroup
        )

        const resultsCount = this.getResults(dynamicRoundData)
            .filter(r => r.subjectID !== playerVotingCardSkipValue)
            .length;

        return filteredResults
            .map(r => {
                return {
                    playerId: r.subjectID,
                    sips: resultsCount > 1 ? defaultCardSips : defaultCardSips + 1,
                    distribute: false
                } as SipResult
            }
        );
    }

    getNewPayToDisplayPlayerId(oldDynamicRoundData: DynamicRoundData, newDynamicRoundData: DynamicRoundData) : string | undefined {
        if (!!!oldDynamicRoundData) return;
        const oldDRD = this.castDynamicRoundData(oldDynamicRoundData);
        const newDRD = this.castDynamicRoundData(newDynamicRoundData);
        if (!oldDRD.payToDisplayPlayerId && newDRD.payToDisplayPlayerId) {
            return newDRD.payToDisplayPlayerId;
        }
        return;
    }
}