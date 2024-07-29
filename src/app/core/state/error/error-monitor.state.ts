import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { IErrorMonitorStateModel } from "./error-monitor.model";
import { Injectable } from "@angular/core";
import { IItError } from "../../models/interfaces";
import { ErrorMonitor } from "./error-monitor.actions";

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

    @Action(ErrorMonitor.SetError)
    setError(ctx: StateContext<IErrorMonitorStateModel>, action: ErrorMonitor.SetError) {
        ctx.setState({
            error: action.error
        });
    }
}