import { Injectable } from "@angular/core";
import { Loading, LoadingError } from "../state";
import { Store } from "@ngxs/store";

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

    loadWithLoadingState(
        loadPredicates: Promise<unknown>[]
    ): Promise<unknown[]> {
        this.store.dispatch(new Loading.StartLoading());
        return Promise.all(loadPredicates)
            .catch(error => {
                if (error instanceof LoadingError) {
                    this.store.dispatch(new Loading.EndLoading(error.exportError()));
                } else {
                    console.error(error);
                }
                return Promise.reject(error);
            })
            .finally(() => {
                this.store.dispatch(new Loading.EndLoading());
            });
    }
}