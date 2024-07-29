import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { ILoadingStateModel } from "./loading.model";
import { Injectable } from "@angular/core";
import { LoadingStates } from "./ELoadingStates";
import { Loading } from "./loading.actions";

const LOADING_STATE_TOKEN = new StateToken<ILoadingStateModel>('loading');

@State<ILoadingStateModel>({
    name: LOADING_STATE_TOKEN,
    defaults: {
        loadingState: LoadingStates.Idle
    }
})
@Injectable()
export class LoadingState {
    @Selector()
    static isLoading(state: ILoadingStateModel): boolean {
        return state.loadingState === LoadingStates.Loading;
    }

    @Action(Loading.StartLoading)
    startLoading(ctx: StateContext<ILoadingStateModel>) {
        const state = ctx.getState();
        if (state.loadingState === LoadingStates.Loading) return;

        ctx.setState({
            ...state,
            loadingState: LoadingStates.Loading
        });
    }
    
    @Action(Loading.EndLoading)
    endLoading(ctx: StateContext<ILoadingStateModel>) {
        const state = ctx.getState();
        if (state.loadingState !== LoadingStates.Loading) return

        ctx.setState({
            ...state,
            loadingState: LoadingStates.Idle,
        });
    }
}