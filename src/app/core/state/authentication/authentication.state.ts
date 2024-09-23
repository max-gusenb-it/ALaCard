import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { AuthenticationActions } from './authentication.actions';
import { AuthService } from '../../services/auth.service';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';
import { Subscription, takeUntil } from 'rxjs';
import { AuthenticationStateModel } from './authentication.model';
import { UserSourceService } from '../../services/data-source/user-source.service';
import { LoadingHelperService } from '../../services/loading-helper.service';
import { User } from '../../models/interfaces';
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
    static user(state: AuthenticationStateModel): User | undefined {
        return state.user;
    }

    @Selector()
    static userid(state: AuthenticationStateModel): string | undefined {
        return state.user?.id;
    }

    @Selector()
    static roomId(state: AuthenticationStateModel): string | undefined {
        return !!state.user?.roomId ? state.user.roomId : undefined;
    }

    @Selector()
    static language(state: AuthenticationStateModel): string | undefined {
        return state.user?.settings.language;
    }

    @Selector()
    static hasRoom(state: AuthenticationStateModel): boolean {
        return state.user?.roomId != null;
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
                ctx.dispatch(new AuthenticationActions.SetUserCredentials(s?.uid, s?.isAnonymous));
        });
    }

    @Action(AuthenticationActions.SignUpUser)
    async signUpUser(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.SignUpUser) {
        if (!!!action.profileFormData) {
            const state = ctx.getState();
            
            if (!!!state.user) return Promise.reject();
            action.profileFormData = {
                username: state.user.username,
                profilePicture: state.user.profilePicture,
                valid: true
            };
        }

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
                            profilePicture: action.profileFormData!.profilePicture,
                            username: action.profileFormData!.username,
                            roomId: null,
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

    @Action(AuthenticationActions.SignInUser)
    signInUser(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.SignInUser) {
        return this.loadingHelperService.loadWithLoadingState([
            this.authService.signInWithEmailAndPassword(
                action.email,
                action.password
            )
        ]);
    }

    @Action(AuthenticationActions.SetUserCredentials)
    setUserCredentials(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.SetUserCredentials) {
        const state = ctx.getState();

        if (action.uid !== undefined && (!!!this.userSubscription$ || this.userSubscription$.closed || action.uid !== state.uid)) {
            if (!!this.userSubscription$ && !this.userSubscription$?.closed) this.userSubscription$.unsubscribe();
            this.userSubscription$ = this.userSourceService.getUser$(action.uid)
                .pipe(takeUntil(this.destroyed$))
                .subscribe(u => {
                    ctx.dispatch(new AuthenticationActions.SetUser(u));
                    if (!!u) {
                        this.settingsService.setAppLanguage(u.settings.language);
                        this.settingsService.setAppColor(u.settings.color);
                    }
                }
            );
        }

        ctx.patchState({
            ...state,
            uid: action.uid,
            isAnonymous: action.isAnonymous
        });
    }

    @Action(AuthenticationActions.ResetPassword)
    resetPassword(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.ResetPassword) {
        return this.loadingHelperService.loadWithLoadingState([
            this.authService.resetPassword(action.email)
        ]);
    }

    @Action(AuthenticationActions.SetUser)
    setUser(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.SetUser) {
        const state = ctx.getState();

        ctx.patchState({
            ...state,
            user: action.user
        });
    }

    @Action(AuthenticationActions.SetUserRoomId)
    setUserRoomId(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.SetUserRoomId) {
        const state = ctx.getState();

        return this.userSourceService.updateUser(
            state.uid!,
            {
                ...state.user!,
                roomId: action.roomId
            }
        );
    }

    @Action(AuthenticationActions.SignOut)
    signOut(ctx: StateContext<AuthenticationStateModel>) {
        this.userSubscription$.unsubscribe();
        ctx.dispatch(new AuthenticationActions.SetUser());
        ctx.dispatch(new AuthenticationActions.SetUserCredentials());
        return this.authService.signOut();
    }
}