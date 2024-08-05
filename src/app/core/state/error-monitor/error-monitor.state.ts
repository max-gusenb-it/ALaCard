import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { IErrorMonitorStateModel } from "./error-monitor.model";
import { Injectable } from "@angular/core";
import { IItError } from "../../models/interfaces";
import { ErrorMonitorActions } from "./error-monitor.actions";

const ERROR_MONITOR_STATE_TOKEN = new StateToken<IErrorMonitorStateModel>('errorMonitor');

@State<IErrorMonitorStateModel>({
    name: ERROR_MONITOR_STATE_TOKEN,
    defaults: {
        error: undefined
    }
})
@Injectable()
export class ErrorMonitorState {
    @Selector()
    static error(state: IErrorMonitorStateModel): IItError | undefined {
        return state.error;
    }

    @Action(ErrorMonitorActions.SetError)
    setError(ctx: StateContext<IErrorMonitorStateModel>, action: ErrorMonitorActions.SetError) {
        ctx.setState({
            error: action.error
        });
    }
}