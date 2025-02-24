import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { 
    PollResult,
    SipResult,
    Player,
    TopicVotingResultConfig,
    IngameDataDataService,
    ResponseDataDataService,
    StaticRoundDataDataService,
    defaultCardSips,
    pollCardSkipValue,
    DynamicRoundData,
    GameSettings,
    MarkdownUtils,
    PollCardStates,
    PollCardService,
} from "@features";
import { 
    Card,
    TopicVotingCard,
    TopicVotingGroup,
    Utils
} from "@shared";

@Injectable({
    providedIn: 'root'
})
export class TopicVotingCardService extends PollCardService<TopicVotingCard, TopicVotingResultConfig> {
    
    constructor(
        store: Store,
        responseDataDataService: ResponseDataDataService,
        ingameDataDataService: IngameDataDataService,
        private staticRoundDataDataService: StaticRoundDataDataService,
        override translateService: TranslateService
    ) {
        super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService, translateService);
    }

    get defaultTopicVotingGroup() {
        return TopicVotingGroup.MostVoted;
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
                this.staticRoundDataDataService.cardState !== PollCardStates.pollCard_offlineSpecifcSipSubject
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
        const castedCard = this.castCard(card);
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

        const distribution = castedCard.settings?.sipConfig?.distribute ?? this.defaultPollVotingDistribution
            ? this.translateService.instant("shared.components.display.it-result.distribute") 
            : this.translateService.instant("shared.components.display.it-result.drink");
        const sip = this.translateService.instant("shared.components.display.it-result.sip")

        return `${inclusion} ${group} <br> ${distribution} ${defaultCardSips} ${sip}`
    }

    override calculateRoundSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const tvCard = this.castCard(card);

        if (tvCard.settings?.sipConfig?.specificSipSubjectId !== undefined) {
            return super.calculateRoundSipResults(card, dynamicRoundData);
        }
        
        let results = this.getResultGroup(dynamicRoundData, card, tvCard.settings?.sipConfig?.resultConfig);

        return results
            .map(r => {
                return r.playerIds.map(pId => {
                    return {
                        playerId: pId,
                        sips: defaultCardSips,
                        distribute: tvCard.settings?.sipConfig?.distribute !== undefined ? 
                            tvCard.settings?.sipConfig?.distribute : 
                            this.defaultPollVotingDistribution
                    } as SipResult
                });
            })
            .flat();
    }

    override getResultGroup(dynamicRoundData: DynamicRoundData, card: Card, resultConfig?: TopicVotingResultConfig) : PollResult[] {
        if (!!!resultConfig) resultConfig = {
            group: this.defaultTopicVotingGroup
        };

        const results = this.getResults(dynamicRoundData, card)
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