import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, map } from "rxjs";
import { IFirestoreBase } from "../../models/interfaces";
import { doc, getFirestore, updateDoc } from "@angular/fire/firestore";
import { initializeApp } from "@angular/fire/app";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService<T extends IFirestoreBase> {
    constructor(
        private afs: AngularFirestore
    ) { }
    
    app = initializeApp(environment.firebase.config);
    firestore = getFirestore(this.app);

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
                    throw new Error();
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

    updateField(ref: string, id: string, fieldRef: string, data: any) {
        return this.afs.collection(ref).doc(id).update({
            [fieldRef]: data
        });
    }
}