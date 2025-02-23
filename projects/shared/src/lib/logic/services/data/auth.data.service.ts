import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Subscription, takeUntil } from "rxjs";
import { UserSourceService } from "../source/user.source.service";
import { AngularLifecycle, AuthenticationActions, AuthenticationState, ItError } from '@shared';

// Todo - structure: make helper service or move back to auth state as functions?

@Injectable({
    providedIn: 'root'
})
export class AuthDataService extends AngularLifecycle {
    userSubscription$: Subscription = null as any;

    constructor(
        private store: Store,
        private fireAuth: AngularFireAuth,
        private userSourceService: UserSourceService
    ) {
        super();
    }

    getAuthState() {
        return this.fireAuth.authState;
    }

    createAuthBasedUserSubscription() {
        this.store.select(AuthenticationState.uid)
            .subscribe(uid => {
                const currentUserId = this.store.selectSnapshot(AuthenticationState.userId);
                if (uid === undefined) {
                    if (!!this.userSubscription$ && !this.userSubscription$.closed) this.userSubscription$.unsubscribe();
                    this.store.dispatch(new AuthenticationActions.SetUser());
                    return;
                }
                if (uid !== currentUserId || !!!this.userSubscription$ || this.userSubscription$.closed) {
                    if (!!this.userSubscription$ && !this.userSubscription$.closed) this.userSubscription$.unsubscribe();
                    this.userSubscription$ = this.userSourceService.getUser$(uid)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(u => {
                            this.store.dispatch(new AuthenticationActions.SetUser(u));
                        }
                    );
                }
            }
        );
    }

    createAccount(register: boolean, email: string, password: string) {
        if (register) {
            return this.createEmailAccount(email, password);
        } else {
            return this.createAnonymousAccount();
        }
    }

    createEmailAccount(email: string, password: string) {
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthDataService.name
                );
            });
    }

    createAnonymousAccount() {
        return this.fireAuth.signInAnonymously()
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthDataService.name
                );
            });
    }

    signInWithEmailAndPassword(email: string, password: string) {
        return this.fireAuth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthDataService.name
                );
            });
    }

    resetPassword(email: string) {
        return this.fireAuth.sendPasswordResetEmail(email)
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthDataService.name
                );
            });
    }

    signOut() {
        this.userSubscription$.unsubscribe();
        return this.fireAuth.signOut();
    }
}