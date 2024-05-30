import { Injectable } from "@angular/core";
import { FirestoreService } from "./firestore.service";
import { IUser } from "../../models/interfaces/logic/IUser";
import { LoadingError } from "../../state";

@Injectable({
    providedIn: 'root'
})
export class UserSourceService {
    private readonly ref = "users";

    constructor(private firestoreService: FirestoreService<IUser>) { }

    getUser$(id: string) {
        return this.firestoreService.getDocWithId$(this.ref, id);
    }

    addUser(id: string, user: IUser) {
        return this.firestoreService.addDocWithId(
            this.ref,
            id,
            user
        ).catch(error => {
            return Promise.reject(new LoadingError(
                error.code,
                UserSourceService.name
            ));
        });
    }
}