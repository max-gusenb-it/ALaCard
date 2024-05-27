import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { LoadingStateModel } from "./loading.model";
import { Injectable } from "@angular/core";
import { LoadingStates } from "./ELoadingStates";
import { Loading } from "./loading.actions";

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

    @Action(Loading.StartLoading)
    startLoading(ctx: StateContext<LoadingStateModel>) {
        const state = ctx.getState();
        if (state.loadingState === LoadingStates.Loading) return;

        ctx.setState({
            ...state,
            loadingState: LoadingStates.Loading
        });
    }
    
    @Action(Loading.EndLoading)
    endLoading(ctx: StateContext<LoadingStateModel>, action: Loading.EndLoading) {
        const state = ctx.getState();

        const error = !!action.error;

        ctx.setState({
            ...state,
            loadingState: error ? LoadingStates.LoadingError : LoadingStates.Idle,
            error: action.error
        });
    }
}