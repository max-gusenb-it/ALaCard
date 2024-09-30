import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { LoadingStateModel } from "./loading.model";
import { Injectable } from "@angular/core";
import { LoadingStates } from "../../models/enums/logic/state/loading/loading-states";
import { LoadingActions } from "./loading.actions";

const LOADING_STATE_TOKEN = new StateToken<LoadingStateModel>('loading');

@State<LoadingStateModel>({
    name: LOADING_STATE_TOKEN,
    defaults: {
        loadingState: LoadingStates.Idle
    }
})
@Injectable()
export class LoadingState {
    @Selector()
    static isLoading(state: LoadingStateModel): boolean {
        return state.loadingState === LoadingStates.Loading;
    }

    @Action(LoadingActions.StartLoading)
    startLoading(ctx: StateContext<LoadingStateModel>) {
        const state = ctx.getState();
        if (state.loadingState === LoadingStates.Loading) return;

        ctx.setState({
            ...state,
            loadingState: LoadingStates.Loading
        });
    }
    
    @Action(LoadingActions.EndLoading)
    endLoading(ctx: StateContext<LoadingStateModel>) {
        const state = ctx.getState();
        if (state.loadingState !== LoadingStates.Loading) return

        ctx.setState({
            ...state,
            loadingState: LoadingStates.Idle,
        });
    }
}