import { Injectable } from "@angular/core";
import { FirestoreService } from "./firestore.service";
import { User } from "../../models/interfaces/logic/user/User";
import { ItError } from "../../models/classes";

@Injectable({
    providedIn: 'root'
})
export class UserSourceService {
    private readonly ref = "users";

    constructor(private firestoreService: FirestoreService<User>) { }

    getUser$(id: string) {
        return this.firestoreService.getDocWithId$(this.ref, id);
    }

    addUser(id: string, user: User) {
        return this.firestoreService.addWithId(
            this.ref,
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
        return this.firestoreService.update(this.ref, id, user).catch(error => {
            return Promise.reject(new ItError(
                error.code,
                UserSourceService.name
            ));
        });
    }
}