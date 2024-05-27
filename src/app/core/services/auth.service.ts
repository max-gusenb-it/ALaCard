import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private fireAuth: AngularFireAuth) { }

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
        return this.fireAuth.createUserWithEmailAndPassword(email, password);
    }

    createAnonymousAccount() {
        return this.fireAuth.signInAnonymously();
    }

    signOut() {
        return this.fireAuth.signOut();
    }
}