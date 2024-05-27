import { LoadingStates } from "./ELoadingStates";

export interface LoadingError {
    location: string;
    code: string;
}

export interface LoadingStateModel {
    loadingState: LoadingStates;
    error?: LoadingError;
}