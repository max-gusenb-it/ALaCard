import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { ErrorMonitorStateModel } from "./error-monitor.model";
import { Injectable } from "@angular/core";
import { ErrorMonitorActions } from "./error-monitor.actions";
import { IItError } from "@shared";

const ERROR_MONITOR_STATE_TOKEN = new StateToken<ErrorMonitorStateModel>('errorMonitor');

@State<ErrorMonitorStateModel>({
    name: ERROR_MONITOR_STATE_TOKEN,
    defaults: {
        error: undefined
    }
})
@Injectable()
export class ErrorMonitorState {
    @Selector()
    static error(state: ErrorMonitorStateModel): IItError | undefined {
        return state.error;
    }

    @Action(ErrorMonitorActions.SetError)
    setError(ctx: StateContext<ErrorMonitorStateModel>, action: ErrorMonitorActions.SetError) {
        ctx.setState({
            error: action.error
        });
    }
}