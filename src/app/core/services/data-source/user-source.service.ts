import { Injectable } from "@angular/core";
import { FirestoreService } from "./firestore.service";
import { User } from "../../models/interfaces/logic/user/user";
import { ItError } from "../../models/classes";
import { usersRef } from "../../constants/firestoreReferences";

@Injectable({
    providedIn: 'root'
})
export class UserSourceService {
    constructor(private firestoreService: FirestoreService<User>) { }

    getUser$(id: string) {
        return this.firestoreService.getDocWithId$(usersRef, id);
    }

    addUser(id: string, user: User) {
        return this.firestoreService.addWithId(
            usersRef,
            id,
            user
        ).catch(error => {
            return Promise.reject(new ItError(
                error.code,
                UserSourceService.name
            ));
        });
    }

    updateUser(id: string, user: User) {
        return this.firestoreService.update(usersRef, id, user).catch(error => {
            return Promise.reject(new ItError(
                error.code,
                UserSourceService.name
            ));
        });
    }
}