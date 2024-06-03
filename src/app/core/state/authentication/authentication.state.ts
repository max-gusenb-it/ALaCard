import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { Authentication } from './authentication.actions';
import { AuthService } from '../../services/auth.service';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';
import { Subscription, takeUntil } from 'rxjs';
import { AuthenticationStateModel } from './authentication.model';
import { UserSourceService } from '../../services/data-source/user-source.service';
import { LoadingHelperService } from '../../services/loading-helper.service';
import { IUser } from '../../models/interfaces';
import { systemDefaultValue } from '../../constants/systemDefaultValue';
import { SettingsService } from '../../services/settings.service';

export const AUTHENTICATION_STATE_TOKEN = new StateToken<AuthenticationStateModel>('authentication');

@State<AuthenticationStateModel>({
    name: AUTHENTICATION_STATE_TOKEN
})
@Injectable()
export class AuthenticationState extends AngularLifecycle implements NgxsOnInit {
    userSubscription$: Subscription = null as any;

    @Selector()
    static isAuthenticated(state: AuthenticationStateModel): boolean {
        return !!state.uid;
    }

    @Selector()
    static isAnonymous(state: AuthenticationStateModel): boolean {
        return Boolean(state.isAnonymous);
    }

    @Selector()
    static user(state: AuthenticationStateModel): IUser | undefined {
        return state.user;
    }

    @Selector()
    static language(state: AuthenticationStateModel): string | undefined {
        return state.user?.settings.language;
    }

    constructor(
        private authService: AuthService,
        private userSourceService: UserSourceService,
        private loadingHelperService: LoadingHelperService,
        private settingsService: SettingsService
    ) {
        super();
    }

    ngxsOnInit(ctx: StateContext<any>): void {
        this.authService.getAuthState()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(s => {
                ctx.dispatch(new Authentication.SetUserCredentials(s?.uid, s?.isAnonymous));
                if ((!!!this.userSubscription$ || this.userSubscription$.closed) && !!s && s.uid !== undefined) {
                    this.userSubscription$ = this.userSourceService.getUser$(s.uid)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(u => {
                            ctx.dispatch(new Authentication.SetUser(u));
                            if (!!u) {
                                this.settingsService.setAppLanguage(u.settings.language);
                                this.settingsService.setAppColor(u.settings.color);
                            }
                        }
                    );
                }
        });
    }

    @Action(Authentication.SignUpUser)
    async signUpUser(ctx: StateContext<AuthenticationStateModel>, action: Authentication.SignUpUser) {
        return this.loadingHelperService.loadWithLoadingState([
            this.authService.createAccount(
                action.createAccountFormData.register,
                action.createAccountFormData.email,
                action.createAccountFormData.password
            ).then(c => {
                if (!!c?.user) {
                    return this.userSourceService.addUser(
                        c.user.uid,
                        {
                            creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                            profilePicture: action.profileFormData.profilePicture,
                            username: action.profileFormData.username,
                            settings: {
                                language: systemDefaultValue,
                                color: systemDefaultValue
                            }
                        }
                    );
                } else {
                    return Promise.reject();
                }
            })
        ]);
    }

    @Action(Authentication.SignInUser)
    signInUser(ctx: StateContext<AuthenticationStateModel>, action: Authentication.SignInUser) {
        return this.loadingHelperService.loadWithLoadingState([
            this.authService.signInWithEmailAndPassword(
                action.email,
                action.password
            )
        ]);
    }

    @Action(Authentication.SetUserCredentials)
    setUserCredentials(ctx: StateContext<AuthenticationStateModel>, action: Authentication.SetUserCredentials) {
        const state = ctx.getState();

        ctx.patchState({
            ...state,
            uid: action.uid,
            isAnonymous: action.isAnonymous
        });
    }

    @Action(Authentication.ResetPassword)
    resetPassword(ctx: StateContext<AuthenticationStateModel>, action: Authentication.ResetPassword) {
        return this.loadingHelperService.loadWithLoadingState([
            this.authService.resetPassword(action.email)
        ]);
    }

    @Action(Authentication.SetUser)
    setUser(ctx: StateContext<AuthenticationStateModel>, action: Authentication.SetUser) {
        const state = ctx.getState();

        ctx.patchState({
            ...state,
            user: action.user
        });
    }

    @Action(Authentication.SignOut)
    signOut(ctx: StateContext<AuthenticationStateModel>) {
        this.userSubscription$.unsubscribe();
        ctx.dispatch(new Authentication.SetUser(undefined));
        return this.authService.signOut();
    }
}