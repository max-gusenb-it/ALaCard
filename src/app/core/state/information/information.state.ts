import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { InformationStateModel } from "./information.model";
import { Injectable } from "@angular/core";
import { InformationActions } from "./information.actions";
import { GameInformation } from "../../models/interfaces";
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

    @Action(InformationActions.SetGameInformation)
    async setGameInformation(ctx: StateContext<InformationStateModel>, action: InformationActions.SetGameInformation) {
        const state = ctx.getState();
        if (state.GameInformations?.compareValue === action.gameInformation.compareValue) return;
        console.log ("Setting game information", action.gameInformation);
        ctx.patchState({
            GameInformations: action.gameInformation
        });
    }

    @Action(InformationActions.GameRulesRead)
    async gameRulesRead(ctx: StateContext<InformationStateModel>, action: InformationActions.GameRulesRead) {
        const state = ctx.getState();
        if (!!!state.GameInformations?.compareValue) {
            throw new ItError(
                InformationStateErrors.gameRulesReadCPNotFound,
                InformationState.name
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
        if (!!!state.GameInformations?.compareValue) {
            throw new ItError(
                InformationStateErrors.gameRulesReadCPNotFound,
                InformationState.name
            )
        };
        ctx.patchState({
            GameInformations: {
                ...state.GameInformations,
                gameRulesCardIndex: action.gameRulesCardIndex
            }
        });
    }
} 
