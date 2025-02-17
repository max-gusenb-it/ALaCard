import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, map } from "rxjs";
import { FirestoreBase } from "../../models/interfaces";
import { getFirestore } from "@angular/fire/firestore";
import { initializeApp } from "@angular/fire/app";
import { environment } from "projects/app/src/environments/environment";
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService<T extends FirestoreBase> {
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
                    console.warn("Document could not be found", `${ref}/${id}`);
                    throw new Error();
                } else {
                    return data;
                }
            })
        ) as Observable<T>;
    }

    getDocVersionTwo$(
        ref: string,
        id: string
    ) {
        return firebase
            .firestore()
            .collection(ref)
            .orderBy("creationDate")
            .get();
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

    upsert(ref: string, id: string, data: T) {
        let copy = data;
        delete copy["id"];
        try {
            return this.afs.collection<T>(ref).doc(id).set(
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