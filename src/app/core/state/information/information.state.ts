import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { InformationStateModel } from "./information.model";
import { Injectable } from "@angular/core";
import { InformationActions } from "./information.actions";
import { GameInformation, Response, RoundInformation } from "../../models/interfaces";
import { ItError } from "../../models/classes";
import { InformationStateErrors } from "../../constants/errorCodes";

export const INFORMATION_STATE_TOKEN = new StateToken<InformationStateModel>('information');

@State<InformationStateModel>({
    name: INFORMATION_STATE_TOKEN,
    defaults: { 
        GameInformations: undefined
    }
})
@Injectable()
export class InformationState {
    @Selector()
    static gameInformation(state: InformationStateModel) : undefined | GameInformation {
        return state.GameInformations;
    }

    @Selector()
    static gameRulesRead(state: InformationStateModel) : undefined | boolean {
        return state.GameInformations?.rulesReadSend;
    }

    @Selector()
    static gameRulesCardIndex(state: InformationStateModel) : number {
        return state.GameInformations?.gameRulesCardIndex ?? 0;
    }

    @Selector()
    static roundInformation(state: InformationStateModel) : RoundInformation | undefined {
        return state.GameInformations?.roundInformation;
    }

    @Selector()
    static response(state: InformationStateModel) : Response | undefined {
        console.log ("Get response");
        return state.GameInformations?.roundInformation?.response;
    }

    @Action(InformationActions.SetGameInformation)
    async setGameInformation(ctx: StateContext<InformationStateModel>, action: InformationActions.SetGameInformation) {
        const state = ctx.getState();
        console.log ("Set Game Information reached");
        if (state.GameInformations?.compareValue === action.gameInformation.compareValue) return;
        console.log ("Set Game Information", action.gameInformation);
        ctx.patchState({
            GameInformations: action.gameInformation
        });
    }

    @Action(InformationActions.GameRulesRead)
    async gameRulesRead(ctx: StateContext<InformationStateModel>, action: InformationActions.GameRulesRead) {
        const state = ctx.getState();

        if (!!!state.GameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.gameRulesRead.name
            )
        };

        ctx.patchState({
            GameInformations: {
                ...state.GameInformations,
                rulesReadSend: true
            }
        });
    }

    @Action(InformationActions.SetGameRulesCardIndex)
    async setGameRulesCardIndex(ctx: StateContext<InformationStateModel>, action: InformationActions.SetGameRulesCardIndex) {
        const state = ctx.getState();

        if (!!!state.GameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.setGameRulesCardIndex.name
            )
        };

        ctx.patchState({
            GameInformations: {
                ...state.GameInformations,
                gameRulesCardIndex: action.gameRulesCardIndex
            }
        });
    }

    @Action(InformationActions.SetRoundId)
    async setRoundId(ctx: StateContext<InformationStateModel>, action: InformationActions.SetRoundId) {
        const state = ctx.getState();
        
        if (!!!state.GameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.setRoundId.name
            )
        };

        console.log ("Set round ID Reached");
        if (!!state.GameInformations.roundInformation && state.GameInformations.roundInformation.roundId === action.roundId) return;

        console.log ("Set round id", action.roundId);
        ctx.patchState({
            GameInformations: {
                ...state.GameInformations,
                roundInformation: {
                    roundId: action.roundId,
                    cardClicked: false
                }
            }
        });
    }

    @Action(InformationActions.SetRoundCardClicked)
    async setRoundCardClicked(ctx: StateContext<InformationStateModel>, action: InformationActions.SetRoundCardClicked) {
        const state = ctx.getState();
        
        if (!!!state.GameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.setRoundCardClicked.name
            )
        };

        if (!!!state.GameInformations.roundInformation) {
            throw new ItError(
                InformationStateErrors.roundInfomrationNotFound,
                InformationState.name,
                this.setRoundCardClicked.name
            )
        }

        ctx.patchState({
            GameInformations: {
                ...state.GameInformations,
                roundInformation: {
                    ...state.GameInformations.roundInformation,
                    cardClicked: true
                }
            }
        });
    }

    @Action(InformationActions.SetRoundResponded)
    async setRoundResponded(ctx: StateContext<InformationStateModel>, action: InformationActions.SetRoundResponded) {
        const state = ctx.getState();
        
        if (!!!state.GameInformations) {
            throw new ItError(
                InformationStateErrors.gameInformationNotFound,
                InformationState.name,
                this.setRoundCardClicked.name
            )
        };

        if (!!!state.GameInformations.roundInformation) {
            throw new ItError(
                InformationStateErrors.roundInfomrationNotFound,
                InformationState.name,
                this.setRoundResponded.name
            )
        }

        console.log ("Set Round Response", action.response);

        ctx.patchState({
            GameInformations: {
                ...state.GameInformations,
                roundInformation: {
                    ...state.GameInformations.roundInformation,
                    response: action.response
                }
            }
        });
    }
} 
