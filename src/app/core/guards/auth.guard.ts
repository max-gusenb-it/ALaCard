import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AuthenticationState } from "../state";

@Injectable({providedIn: 'root'})
export class AuthGuard {
    constructor(private store: Store) {}

    canActivate() {
      const isAuthenticated = this.store.selectSnapshot(AuthenticationState.isAuthenticated);
      return isAuthenticated;
    }
}