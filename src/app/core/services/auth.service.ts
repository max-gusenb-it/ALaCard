import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Loading } from "../state";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private fireAuth: AngularFireAuth,
        private store: Store
    ) { }

    getAuthState() {
        return this.fireAuth.authState;
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
                this.store.dispatch(new Loading.EndLoading({
                    location: AuthService.name,
                    code: error.code
                }));
            });
    }

    createAnonymousAccount() {
        return this.fireAuth.signInAnonymously()
            .catch(error => {
                this.store.dispatch(new Loading.EndLoading({
                    location: AuthService.name,
                    code: error.code
                }));
            });
    }

    signOut() {
        return this.fireAuth.signOut();
    }
}