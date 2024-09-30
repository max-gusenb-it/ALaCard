import firebase from 'firebase/compat/app';

export interface FirestoreBase {
    id?: string;
    creationDate: firebase.firestore.Timestamp;
}