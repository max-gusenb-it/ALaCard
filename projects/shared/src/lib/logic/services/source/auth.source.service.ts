import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ItError } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class AuthSourceService {
    constructor(private fireAuth: AngularFireAuth) { }

    getAuthState$() {
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
                    AuthSourceService.name
                );
            });
    }

    createAnonymousAccount() {
        return this.fireAuth.signInAnonymously()
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthSourceService.name
                );
            });
    }

    signInWithEmailAndPassword(email: string, password: string) {
        return this.fireAuth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthSourceService.name
                );
            });
    }

    resetPassword(email: string) {
        return this.fireAuth.sendPasswordResetEmail(email)
            .catch(error => {
                throw new ItError(
                    error.code,
                    AuthSourceService.name
                );
            });
    }

    signOut() {
        return this.fireAuth.signOut();
    }
}