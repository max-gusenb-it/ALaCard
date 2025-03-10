import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { ErrorMonitorActions, ItError, LoadingActions, SharedErrors } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class LoadingHelperService {
    constructor(private store: Store) {}

    loadWithLoadingState<T>(
        loadPredicates: [ Promise<T> ]
    ): Promise<[T]>;

    loadWithLoadingState<T1, T2>(
        loadPredicates: [ Promise<T1>, Promise<T2> ]
    ): Promise<[T1, T2]>;

    loadWithLoadingState<T1, T2, T3>(
        loadPredicates: [ Promise<T1>, Promise<T2>, Promise<T3> ]
    ): Promise<[T1, T2, T3]>;

    loadWithLoadingState<T1, T2, T3, T4>(
        loadPredicates: [ Promise<T1>, Promise<T2>, Promise<T3>, Promise<T4> ]
    ): Promise<[T1, T2, T3, T4]>;

    loadWithLoadingState(
        loadPredicates: Promise<unknown>[]
    ): Promise<unknown[]> {
        if (navigator.onLine) this.store.dispatch(new LoadingActions.StartLoading());
        return Promise.all(loadPredicates)
            .catch(error => {
                if (error instanceof ItError) {
                    this.store.dispatch(new ErrorMonitorActions.SetError(error.exportError()));
                } else {
                    console.error(error);
                    this.store.dispatch(
                        new ErrorMonitorActions.SetError({
                            code: SharedErrors.unknownError,
                            location: LoadingHelperService.name
                        })
                    );
                }
                return Promise.reject(error);
            })
            .finally(() => {
                this.store.dispatch(new LoadingActions.EndLoading());
            });
    }
}