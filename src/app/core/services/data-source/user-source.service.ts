import { Injectable } from "@angular/core";
import { FirestoreService } from "./firestore.service";
import { IUser } from "../../models/interfaces/logic/IUser";

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
        )
    }
}