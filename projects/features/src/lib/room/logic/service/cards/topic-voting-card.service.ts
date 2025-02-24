import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import {
    RoomState,
    TopicVotingResponse,
    DynamicTopicVotingRoundData,
    DynamicRoundData,
    defaultCardSips,
    topicVotingCardSkipValue,
    IngameDataDataService,
    ResponseDataDataService,
    StaticRoundDataDataService,
    Response,
    CardService,
    SipResult,
    TopicVotingResult,
    TopicVotingCardResultConfig,
    TopicVotingCardStates,
    CardStates,
    Result,
    Player,
    MarkdownUtils,
    CardUtils,
    GameSettings
} from "@features";
import { 
    Card,
    TopicVotingCard,
    TopicVotingGroup,
    Utils,
} from "@shared";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class TopicVotingCardService<C extends TopicVotingCard, S extends TopicVotingCardResultConfig> extends CardService<TopicVotingCard, TopicVotingResponse, DynamicTopicVotingRoundData, TopicVotingResult, TopicVotingCardResultConfig> {

    get defaultTopicVotingVotingDistribution() {
        return true;
    }

    get defaultTopicVotingGroup() {
        return TopicVotingGroup.MostVoted;
    }

    constructor(
        private store: Store,
        responseDataDataService: ResponseDataDataService,
        ingameDataDataService: IngameDataDataService,
        private staticRoundDataDataService: StaticRoundDataDataService,
        protected translateService: TranslateService
    ) {
        super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService);
    }

    override castCard(card: Card): C {
        let topicVotingCard = super.castCard(card);
        return <C>{
            ...topicVotingCard,
            subjects: topicVotingCard.subjects.map((c, index) => {
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

    override createDynamicRoundData(roundId: number, responses: Response[]): DynamicTopicVotingRoundData {
        const pvResponses = this.castResponses(responses);
        let drd: DynamicTopicVotingRoundData = super.createDynamicRoundData(roundId, responses);
        drd.responses = pvResponses;
        return drd;
    }

    override getResults(dynamicRoundData: DynamicRoundData, card?: Card): TopicVotingResult[] {
        let results: TopicVotingResult[] = [];
        const dynamicTopicVotingRoundData = this.castDynamicRoundData(dynamicRoundData);
        dynamicTopicVotingRoundData.responses.forEach(response => {
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
            if (r1.subjectId === topicVotingCardSkipValue) return 1;
            if (r2.subjectId === topicVotingCardSkipValue) return -1;
            return r2.votes - r1.votes;
        });
        return results;
    }

    override hasFollowUpCard(card: Card, cardState: string): boolean {
        switch(cardState) {
            case(CardStates.card_initial): {
                return this.hasDefaultFollowUpCard(card) || super.hasFollowUpCard(card, cardState);
            }
            case(TopicVotingCardStates.topicVotingCard_offlineSpecifcSipSubject): {
                return super.hasFollowUpCard(card, cardState);
            }
            default: return false;
        }
    }

    override hasDefaultFollowUpCard(card: Card) {
        const topicVotingCard = this.castCard(card);
        const gameSettings = this.store.selectSnapshot(RoomState.gameSettings)!;
        const roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
        return gameSettings?.drinkingGame && roomSettings.singleDeviceMode && topicVotingCard.settings?.sipConfig?.specificSipSubjectId !== undefined;
    }

    override getNextCardState(): string {
        return TopicVotingCardStates.topicVotingCard_offlineSpecifcSipSubject;
    }

    override calculateRoundSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const topicVotingCard = this.castCard(card);
    
        let results = this.getResultGroup(dynamicRoundData);

        return results
            .map(r => {
                return r.playerIds.map(pId => {
                    return {
                        playerId: pId,
                        sips: defaultCardSips,
                        distribute: topicVotingCard.settings?.sipConfig?.distribute !== undefined ? 
                            topicVotingCard.settings?.sipConfig?.distribute : 
                            this.defaultTopicVotingVotingDistribution
                    } as SipResult
                });
            })
            .flat();
    }

    override getResultsHeading(results: TopicVotingResult[], card: Card): string {
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

    override getOfflineCardText(card: Card, players: Player[], playerIds: string[] | undefined, speficPlayerId: string | undefined, gameSettings: GameSettings): string {
        let text = this.getCardText(card, players, playerIds, speficPlayerId);
        text += "<br><br>\n";
        const castedCard = this.castCard(card);
        castedCard.subjects.forEach(subject => {
            text += `* ${subject.title}\n`
        });
        if (gameSettings.drinkingGame) {
            text += "<br><br>\n  \n";
            let sipText = "";
            if (
                this.hasDefaultFollowUpCard(card) && 
                this.staticRoundDataDataService.cardState !== TopicVotingCardStates.topicVotingCard_offlineSpecifcSipSubject
            ) {
                sipText = this.translateService.instant("features.room.game.game-cards.offline-sip-display.sips-on-next-card");
            } else {
                sipText = this.getOfflineSipText(card);
            }
            text += MarkdownUtils.addTagToContent(sipText, "span", ["text-sm"])
        }
        return text;
    }

    getOfflineSipText(card: Card) {
        const castedCard = CardUtils.castCard<TopicVotingCard>(card);
        let inclusion = "";
        let group = "";

        if (Utils.isNumberDefined(castedCard.settings?.sipConfig?.specificSipSubjectId)) {
            inclusion = this.translateService.instant("features.room.game.game-cards.offline-sip-display.voted-for-topic");
            group = castedCard.subjects[castedCard.settings!.sipConfig!.specificSipSubjectId!].title;
        } else {
            inclusion = this.translateService.instant("features.room.game.game-cards.offline-sip-display.in");
            switch(castedCard.settings?.sipConfig?.resultConfig?.group) {
                default:
                case(TopicVotingGroup.MostVoted): {
                    group = this.translateService.instant("features.room.game.game-cards.offline-sip-display.most-voted-topic");
                } break;
                case(TopicVotingGroup.LeastVoted): {
                    group = this.translateService.instant("features.room.game.game-cards.offline-sip-display.least-voted-topic")
                } break;
            }
        }

        const distribution = castedCard.settings?.sipConfig?.distribute ?? this.defaultTopicVotingVotingDistribution
            ? this.translateService.instant("shared.components.display.it-result.distribute") 
            : this.translateService.instant("shared.components.display.it-result.drink");
        const sip = this.translateService.instant("shared.components.display.it-result.sip")

        return `${inclusion} ${group} <br> ${distribution} ${defaultCardSips} ${sip}`
    }

    override getResultText(result: Result): string {
        const topicVotingResult = this.castResult(result);
        const translation = topicVotingResult.votes === 1 ? this.translateService.instant("shared.components.display.it-result.vote") : this.translateService.instant("shared.components.display.it-result.votes");
        return `${topicVotingResult.votes} ${translation}`;
    }
    
    override cardHasResultSubText(card: Card): boolean {
        const topicVotingCard = this.castCard(card);
        if (topicVotingCard.settings?.isAnonymous) return false;
        return true;
    }
    
    override getResultSubText(result: Result, players: Player[]): string {
        const topicVotingResult = this.castResult(result);
        let text = "";
        topicVotingResult.playerIds.forEach((playerId, index) => {
            text += players.find(p => p.id === playerId)!.username;
            if (index !== topicVotingResult.playerIds.length -1) text += ", ";
        });
        return text;
    }

    override getResultGroup(dynamicRoundData: DynamicRoundData, resultConfig?: TopicVotingCardResultConfig) : TopicVotingResult[] {
        if (!!!resultConfig) resultConfig = {
            group: this.defaultTopicVotingGroup
        };

        const results = this.getResults(dynamicRoundData)
            .filter(r => r.subjectId !== topicVotingCardSkipValue);

        let resultGroup: TopicVotingResult[] = [];
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

    // ToDo: move to topic voting card
    getTopResults(results: TopicVotingResult[]): TopicVotingResult[] {
        return results
            .filter(r => r.votes === results[0].votes && r.subjectId !== topicVotingCardSkipValue);
    }
}