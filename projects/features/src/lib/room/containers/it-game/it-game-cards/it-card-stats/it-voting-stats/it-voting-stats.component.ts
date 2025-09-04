import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { Store } from "@ngxs/store";
import { firstValueFrom, takeUntil } from "rxjs";
import {
    CardUtils,
    ColorUtils,
    RoomState,
    Round,
    VotingCardTranslationService,
    VotingCardService,
    CardServiceFactory,
    IngameDataDataService,
    VotingResult,
    votingCardSkipValue,
    RoomService,
    GameService,
    defaultPayToDisplaySips,
    IngameDataSourceService,
    DynamicVotingRoundData
} from "@features";
import {
    AngularLifecycle,
    AuthenticationState,
    Card,
    PopUpService,
    StyleSettings,
    Utils,
    VotingCard
} from "@shared";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'it-voting-stats',
    templateUrl: './it-voting-stats.component.html'
})
export class ItVotingStatsComponent extends AngularLifecycle implements AfterViewInit {
    @Input() card: Card;
    @Input() defaultSipText?: string; 
    @Input() round: Round;
    @Input() styleSettings?: StyleSettings;
        
    get votingCardService() {
        return <VotingCardService<VotingCard>>this.cardServiceFactory.getCardService(this.card.type);
    }

    get votingCardTranslationService() {
        return <VotingCardTranslationService>this.cardServiceFactory.getCardTranslationService(this.card.type);
    }

    get votingCard() {
        return this.votingCardService.castCard(this.card);
    }

    get skipValue() {
        return votingCardSkipValue;
    }
  
    get statsBackgroundCSS() {
        return ColorUtils.getBackground100CSS(this.cardColor)
    }
    
    get cardColor()  {
        return CardUtils.getCardColor(this.card);
    }

    get drinkingGame() {
        return this.store.selectSnapshot(RoomState.gameSettings)?.drinkingGame;
    }

    constructor(
        private store: Store,
        private cardServiceFactory: CardServiceFactory,
        private ingameDataSourceService: IngameDataSourceService,
        private ingameDataDataService: IngameDataDataService,
        private changeDetectorRef: ChangeDetectorRef,
        private roomService: RoomService,
        private gameService: GameService,
        private popUpService: PopUpService,
        private translateService: TranslateService
    ) {
        super();
    }

    results: VotingResult[];
    payToDisplayPlayerId: string;

    ngAfterViewInit(): void {
        this.ingameDataDataService.getDynamicRoundData$()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(dynamicRoundData => {
                if (!!!dynamicRoundData) return;
                const newPayToDisplayPlayerId = this.votingCardService.castDynamicRoundData(dynamicRoundData).payToDisplayPlayerId;
                if (
                    !Utils.isStringDefinedAndNotEmpty(this.payToDisplayPlayerId) &&
                    Utils.isStringDefinedAndNotEmpty(newPayToDisplayPlayerId)
                ) {
                    this.popUpService.openSnackbar(this.getPayToDisplayNotificationText(newPayToDisplayPlayerId));
                }
                this.payToDisplayPlayerId = newPayToDisplayPlayerId;
                this.results = this.votingCardService.getResults(dynamicRoundData, this.card);
                this.changeDetectorRef.detectChanges();
            });
    }
    
    getPayToDisplayNotificationText(newPayToDisplayPlayerId: string) : string {
        const player = this.store.selectSnapshot(RoomState.players).find(p => p.id === newPayToDisplayPlayerId);
        const notificationPart1 = this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay-to-display-drinking-notification-1");
        const sips = this.translateService.instant("shared.components.display.it-result.sips");
        const notificationPart2 = this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay-to-display-drinking-notification-2")
        return `${player?.username} ${notificationPart1} ${defaultPayToDisplaySips} ${sips} ${notificationPart2}`;
    }

    getCardTitle() {
        return this.votingCardTranslationService.getCardTitle(this.card, this.styleSettings?.globalCardTitle);
    }

    getCardText() {
        return this.votingCardTranslationService.formatCardText(
            this.card.text,
            this.store.selectSnapshot(RoomState.players),
            this.round.playerIds,
            this.store.selectSnapshot(RoomState.specificPlayerId)
        );
    }

    getSipText() {
        if (this.drinkingGame && Utils.isStringDefinedAndNotEmpty(this.card.sipText ?? this.defaultSipText)) {
            return this.votingCardTranslationService.formatCardText(
                this.card.sipText ?? this.defaultSipText!,
                this.store.selectSnapshot(RoomState.players),
                this.round.playerIds,
                this.store.selectSnapshot(RoomState.specificPlayerId)
            );
        }
        return "";
    }

    getResultsHeading() {
        return this.votingCardTranslationService.getResultsHeading(
            this.votingCardService.getSubjects(this.card),
            this.votingCardService.getTopResults(this.results)
        );
    }

    getResultTitle(result: VotingResult, resultIndex: number) {
        return this.votingCardTranslationService.getResultTitle(
            result,
            resultIndex,
            this.votingCardService.getSubjects(this.card),
            this.votingCardService.getTopResults(this.results)
        );
    }

    displayPayToDisplay() {
        return this.drinkingGame && 
            this.votingCard.settings?.payToDisplay && 
            !Utils.isStringDefinedAndNotEmpty(this.payToDisplayPlayerId);
    }
    
    async payToDisplay() {
        const payToDisplay = await firstValueFrom(
            this.popUpService.openOptionBottomSheet(
                this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay-to-display-explanation"),
                this.translateService.instant("actions.cancel"),
                `${this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay")} ${defaultPayToDisplaySips} ${this.translateService.instant("shared.components.display.it-result.sips")}`
            ).closed
        );
        if (payToDisplay && !Utils.isStringDefinedAndNotEmpty(this.payToDisplayPlayerId)) {
            this.ingameDataSourceService.updateDynamicRoundData(
                this.store.selectSnapshot(RoomState.roomId)!,
                {
                    ...this.ingameDataDataService.getDynamicRoundData(),
                    payToDisplayPlayerId: this.store.selectSnapshot(AuthenticationState.userId)
                } as DynamicVotingRoundData
            )
        }
    }

    isUserRoomAdmin() {
        return this.roomService.isUserAdmin();
    }

    startNextRound() {
        this.gameService.startNewRound();
    }
}