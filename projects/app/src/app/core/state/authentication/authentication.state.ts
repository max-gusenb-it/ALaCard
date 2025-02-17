import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { Action, NgxsOnInit, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { AuthenticationActions } from './authentication.actions';
import { AuthDataService } from '../../services/data/auth.data.service';
import { AngularLifecycle } from 'projects/app/src/app/shared/helper/angular-lifecycle.helper';
import { firstValueFrom, takeUntil } from 'rxjs';
import { AuthenticationStateModel } from './authentication.model';
import { UserSourceService } from '../../services/source/user.source.service';
import { LoadingHelperService } from '../../services/helper/loading.helper.service';
import { GameHistoryEntry, TutorialInfo, User } from '../../models/interfaces';
import { systemDefaultValue } from '../../constants/systemDefaultValue';
import { EmailAuthProvider, linkWithCredential } from '@angular/fire/auth';

export const AUTHENTICATION_STATE_TOKEN = new StateToken<AuthenticationStateModel>('authentication');

@State<AuthenticationStateModel>({
    name: AUTHENTICATION_STATE_TOKEN
})
@Injectable()
export class AuthenticationState extends AngularLifecycle implements NgxsOnInit {

    @Selector()
    static isAuthenticated(state: AuthenticationStateModel): boolean {
        return !!state.uid;
    }

    @Selector()
    static uid(state: AuthenticationStateModel): string | undefined {
        return state.uid;
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
    static userId(state: AuthenticationStateModel): string | undefined {
        return state.user?.id;
    }

    @Selector()
    static tutorialInfos(state: AuthenticationStateModel): TutorialInfo[] {
        return !!state.user?.tutorialInfos ? state.user.tutorialInfos : [];
    }

    @Selector()
    static gameHistory(state: AuthenticationStateModel): GameHistoryEntry[] {
        return !!state.user?.gameHistory ? state.user.gameHistory : [];
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
        private authDataService: AuthDataService,
        private userSourceService: UserSourceService,
        private loadingHelperService: LoadingHelperService
    ) {
        super();
    }

    ngxsOnInit(ctx: StateContext<any>): void {
        this.authDataService.getAuthState()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(s => {
                ctx.dispatch(new AuthenticationActions.SetUserCredentials(s?.uid, s?.isAnonymous));
        });

        this.authDataService.createAuthBasedUserSubscription();
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
            this.authDataService.createAccount(
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
                            },
                            tutorialInfos: [],
                            gameHistory: []
                        }
                    );
                } else {
                    return Promise.reject();
                }
            })
        ]);
    }

    @Action(AuthenticationActions.SignUpAnonymousUser)
    async signUpAnonymousUser(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.SignUpAnonymousUser) {
        const user = await firstValueFrom(this.authDataService.getAuthState());
        if (!!user && user.isAnonymous) {
            const newCredential = EmailAuthProvider.credential(action.email, action.password);
            let credential = await linkWithCredential(user, newCredential);
            ctx.dispatch(new AuthenticationActions.SetUserCredentials(credential.user.uid, credential.user.isAnonymous));
        }
    }

    @Action(AuthenticationActions.SignInUser)
    signInUser(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.SignInUser) {
        return this.loadingHelperService.loadWithLoadingState([
            this.authDataService.signInWithEmailAndPassword(
                action.email,
                action.password
            )
        ]);
    }

    @Action(AuthenticationActions.SetUserCredentials)
    setUserCredentials(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.SetUserCredentials) {
        const state = ctx.getState();

        ctx.patchState({
            ...state,
            uid: action.uid,
            isAnonymous: action.isAnonymous
        });
    }

    @Action(AuthenticationActions.ResetPassword)
    resetPassword(ctx: StateContext<AuthenticationStateModel>, action: AuthenticationActions.ResetPassword) {
        return this.loadingHelperService.loadWithLoadingState([
            this.authDataService.resetPassword(action.email)
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
        ctx.dispatch(new AuthenticationActions.SetUser());
        ctx.dispatch(new AuthenticationActions.SetUserCredentials());
        return this.authDataService.signOut();
    }
}