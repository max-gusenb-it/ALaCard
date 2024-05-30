import { LoadingStates } from "./ELoadingStates";

export class LoadingError extends Error {
    location: string;

    constructor(msg: string, location: string) {
        super(msg);

        this.location = location;
        Object.setPrototypeOf(this, LoadingError.prototype);
    }

    exportError(): ILoadingError {
        return {
            code: this.message,
            location: this.location
        }
    }
}

export interface ILoadingError {
    location: string;
    code: string;
}

export interface ILoadingStateModel {
    loadingState: LoadingStates;
    error?: ILoadingError;
}