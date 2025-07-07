import { Action, NgxsOnInit, Selector, State, StateContext, StateToken, Store } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { takeUntil } from "rxjs";
import {
    AngularLifecycle,
    GameInformation,
    InformationStateErrors,
    ItError,
    RoundInformation,
    AuthenticationState,
    UserSourceService,
    InformationActions,
    InformationStateModel,
    PopUpService
} from '@shared';
import { Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

export const INFORMATION_STATE_VERSION = 1;
export const INFORMATION_STATE_TOKEN = new StateToken<InformationStateModel>('information');

@State<InformationStateModel>({
    name: INFORMATION_STATE_TOKEN,
    defaults: {
        version: INFORMATION_STATE_VERSION,
        gameInformations: undefined,
        tutorialInfos: [],
        joinedInSingleDeviceMode: false
    }
})
@Injectable()
export class InformationState extends AngularLifecycle implements NgxsOnInit {

    constructor(
        private store: Store,
        private userSourceService: UserSourceService,
        private platform: Platform,
        private popUpService: PopUpService,
        private translateService: TranslateService
    ) {
        super();
    }

    @Selector()
    static gameInformation(state: InformationStateModel) : undefined | GameInformation {
        return state.gameInformations;
    }

    @Selector()
    static gameRulesRead(state: InformationStateModel) : undefined | boolean {
        return state.gameInformations?.rulesReadSend;
    }

    @Selector()
    static gameRulesCardIndex(state: InformationStateModel) : number {
        return state.gameInformations?.gameRulesCardIndex ?? 0;
    }

    @Selector()
    static roundInformation(state: InformationStateModel) : RoundInformation | undefined {
        return state.gameInformations?.roundInformation;
    }

    @Selector()
    static response(state: InformationStateModel) : any | undefined {
        return state.gameInformations?.roundInformation?.response;
    }

    @Selector()
    static cardAnimationSkipped(state: InformationStateModel) : boolean {
        return state.gameInformations?.roundInformation?.cardAnimationSkipped ?? false;
    }

    @Selector()
    static joinedInSingleDeviceMode(state: InformationStateModel) : boolean {
        return state.joinedInSingleDeviceMode;
    }

    ngxsOnInit(ctx: StateContext<InformationStateModel>): void {
        const state = ctx.getState();
        this.store.select(AuthenticationState.tutorialInfos)    
            .pipe(
                takeUntil(this.destroyed$)
            )
            .subscribe(tutorialInfos => {
                ctx.patchState({tutorialInfos: tutorialInfos});
        });
        if (state.version === INFORMATION_STATE_VERSION) return;
        let tutorialInfos = !!state.tutorialInfos ? state.tutorialInfos : [];
        ctx.patchState({
            version: INFORMATION_STATE_VERSION,
            gameInformations: undefined,
            tutorialInfos: tutorialInfos
        });
    }

    @Action(InformationActions.SetGameInformation)
    async setGameInformation(ctx: StateContext<InformationStateModel>, action: InformationActions.SetGameInformation) {
        const state = ctx.getState();
        if (state.gameInformations?.compareValue === action.gameInformation.compareValue) return;
        ctx.patchState({
            gameInformations: action.gameInformation
        });
    }

    @Action(InformationActions.GameRulesRead)
    async gameRulesRead(ctx: StateContext<InformationStateModel>, action: InformationActions.GameRulesRead) {
        const state = ctx.getState();

        if (!!!state.gameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.gameRulesRead.name
            )
        };

        ctx.patchState({
            gameInformations: {
                ...state.gameInformations,
                rulesReadSend: true
            }
        });
    }

    @Action(InformationActions.SetGameRulesCardIndex)
    async setGameRulesCardIndex(ctx: StateContext<InformationStateModel>, action: InformationActions.SetGameRulesCardIndex) {
        const state = ctx.getState();

        if (!!!state.gameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.setGameRulesCardIndex.name
            )
        };

        ctx.patchState({
            gameInformations: {
                ...state.gameInformations,
                gameRulesCardIndex: action.gameRulesCardIndex
            }
        });
    }

    @Action(InformationActions.SetRoundId)
    async setRoundId(ctx: StateContext<InformationStateModel>, action: InformationActions.SetRoundId) {
        const state = ctx.getState();
        
        if (!!!state.gameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.setRoundId.name
            )
        };

        if (!!state.gameInformations.roundInformation && state.gameInformations.roundInformation.roundId === action.roundId) return;

        ctx.patchState({
            gameInformations: {
                ...state.gameInformations,
                roundInformation: {
                    roundId: action.roundId,
                    cardAnimationSkipped: false
                }
            }
        });
    }

    @Action(InformationActions.SetCardAnimationSkippedClicked)
    async setRoundCardClicked(ctx: StateContext<InformationStateModel>, action: InformationActions.SetCardAnimationSkippedClicked) {
        const state = ctx.getState();
        
        if (!!!state.gameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.setRoundCardClicked.name
            )
        };

        if (!!!state.gameInformations.roundInformation) {
            throw new ItError(
                InformationStateErrors.roundInfomrationNotFound,
                InformationState.name,
                this.setRoundCardClicked.name
            )
        }

        ctx.patchState({
            gameInformations: {
                ...state.gameInformations,
                roundInformation: {
                    ...state.gameInformations.roundInformation,
                    cardAnimationSkipped: action.cardAnimationSkipped
                }
            }
        });
    }

    @Action(InformationActions.SetRoundResponded)
    async setRoundResponded(ctx: StateContext<InformationStateModel>, action: InformationActions.SetRoundResponded) {
        const state = ctx.getState();
        
        if (!!!state.gameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.setRoundCardClicked.name
            )
        };

        if (!!!state.gameInformations.roundInformation) {
            throw new ItError(
                InformationStateErrors.roundInfomrationNotFound,
                InformationState.name,
                this.setRoundResponded.name
            )
        }

        ctx.patchState({
            gameInformations: {
                ...state.gameInformations,
                roundInformation: {
                    ...state.gameInformations.roundInformation,
                    response: action.response
                }
            }
        });
    }

    @Action(InformationActions.DisplayDualTutorial)
    async displayDualTutorial(ctx: StateContext<InformationStateModel>, action: InformationActions.DisplayDualTutorial) {
        const labelID = this.platform.is('mobileweb') ? action.mobileLabelID : action.desktopLabelID;
        ctx.dispatch(new InformationActions.NewDisplayTutorial(labelID, action.icon));
    }

    @Action(InformationActions.NewDisplayTutorial)
    async displayTutorial(ctx: StateContext<InformationStateModel>, action: InformationActions.NewDisplayTutorial) {
        const state = ctx.getState();
        const wasTutorialDisplayed = !!state.tutorialInfos.find(t => t.labelID === action.labelID);
        if(wasTutorialDisplayed) return;

        this.popUpService.openSnackbar(
            this.translateService.instant(action.labelID),
            action.icon,
            false,
            true,
            10000
        );
        
        ctx.patchState({
            ...state,
            tutorialInfos: [
                ...state.tutorialInfos,
                {
                    displayDate: new Date(),
                    labelID: action.labelID
                }
            ]
        });

        const user = this.store.selectSnapshot(AuthenticationState.user);
        if (!!!user) return;

        this.userSourceService.updateUser(
            user.id!,
            {
                ...user,
                tutorialInfos: [...ctx.getState().tutorialInfos]
            }
        );
    }

    @Action(InformationActions.SetJoinedInSingleDeviceMode)
    async setJoinedInSingleDeviceMode(ctx: StateContext<InformationStateModel>, action: InformationActions.SetJoinedInSingleDeviceMode) {
        ctx.patchState({
            joinedInSingleDeviceMode: action.joinedInSingleDeviceMode
        });
    }   
} 
