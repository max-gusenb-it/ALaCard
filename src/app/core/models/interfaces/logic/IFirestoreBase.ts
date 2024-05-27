import firebase from 'firebase/compat/app';

export interface IFirestoreBase {
    id?: string;
    creationDate: firebase.firestore.Timestamp;
}