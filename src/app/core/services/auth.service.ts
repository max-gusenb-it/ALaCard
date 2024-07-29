import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { ItError } from "../models/classes";

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
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthService.name
                );
            });
    }

    createAnonymousAccount() {
        return this.fireAuth.signInAnonymously()
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthService.name
                );
            });
    }

    signInWithEmailAndPassword(email: string, password: string) {
        return this.fireAuth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthService.name
                );
            });
    }

    resetPassword(email: string) {
        return this.fireAuth.sendPasswordResetEmail(email)
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthService.name
                );
            });
    }

    signOut() {
        return this.fireAuth.signOut();
    }
}