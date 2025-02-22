import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Subscription, takeUntil } from "rxjs";
import { UserSourceService } from "../source/user.source.service";
import { SettingsService } from "projects/shared/src/lib/logic/services/settings.service";
import { AngularLifecycle, AuthenticationActions, AuthenticationState, ItError, systemDefaultValue } from '@shared';

// Todo - structure: refactor settings service outh from here

// * create user-data-service 
// * use new user data service in auth state to load user
// * call settings service

@Injectable({
    providedIn: 'root'
})
export class AuthDataService extends AngularLifecycle {
    userSubscription$: Subscription = null as any;

    constructor(
        private store: Store,
        private fireAuth: AngularFireAuth,
        private settingsService: SettingsService,
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
                            if (!!u) {
                                this.settingsService.setAppLanguage(u.settings.language);
                                this.settingsService.setAppColor(u.settings.color);
                            }
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
        this.settingsService.setAppLanguage(systemDefaultValue);
        this.settingsService.setAppColor(systemDefaultValue);
        return this.fireAuth.signOut();
    }
}