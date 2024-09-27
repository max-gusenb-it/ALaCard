import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { InformationStateModel } from "./information.model";
import { Injectable } from "@angular/core";
import { InformationActions } from "./information.actions";
import { RoomInformation } from "../../models/interfaces";

export const INFORMATION_STATE_TOKEN = new StateToken<InformationStateModel>('information');

@State<InformationStateModel>({
    name: INFORMATION_STATE_TOKEN,
    defaults: { 
        roomInformations: undefined
    }
})
@Injectable()
export class InformationState {
    @Selector()
    static roomInformation(state: InformationStateModel) : undefined | RoomInformation {
        return state.roomInformations;
    }

    @Selector()
    static roomRulesRead(state: InformationStateModel) : undefined | boolean {
        return state.roomInformations?.rulesReadSend;
    }

    @Action(InformationActions.SetRoom)
    async setRoom(ctx: StateContext<InformationStateModel>, action: InformationActions.SetRoom) {
        // add game compare value so information is not reset on every join
        ctx.patchState({
            roomInformations: {
                roomID: action.roomID,
                rulesReadSend: false
            }
        });
    }

    @Action(InformationActions.RoomRulesRead)
    async roomRulesRead(ctx: StateContext<InformationStateModel>, action: InformationActions.RoomRulesRead) {
        const state = ctx.getState();
        if (!!!state.roomInformations?.roomID) return;
        ctx.patchState({
            roomInformations: {
                ...state.roomInformations,
                rulesReadSend: true
            }
        });
    }
} 
