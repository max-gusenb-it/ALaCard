import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, map } from "rxjs";
import { IFirestoreBase } from "../../models/interfaces";
import { Store } from "@ngxs/store";
import { Loading } from "../../state";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService<T extends IFirestoreBase> {
    constructor(
        private afs: AngularFirestore,
        private store: Store
    ) { }

    getDocWithId$(
        ref: string,
        id: string
    ) {
        return this.afs.doc<T>(`${ref}/${id}`).valueChanges({
            idField: "id"
        }).pipe(
            map((data: any) => {
                var keys = Object.keys(data);
                if (keys.length === 1 && keys[0] === 'id') {
                    return undefined;
                } else {
                    return data;
                }
            })
        ) as Observable<T>;
    }

    add(ref: string, data: T) {
        try {
            return this.afs.collection<T>(ref).add(data).then((res) => {
                return {
                    id: res.id,
                    ...data
                } as T;
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    addWithId(ref: string, id: string, data: T) {
        let copy = data;
        delete copy["id"];
        try {
            return this.afs.collection<T>(ref).doc(id).set(data).then((res) => {
                return {
                    id: id,
                    ...data,
                } as T;
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    update(ref: string, id: string, data: T) {
        let copy = data;
        delete copy["id"];
        try {
            return this.afs.collection<T>(ref).doc(id).update(
              data
            ).then(() => data);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}