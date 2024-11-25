import firebase from 'firebase/compat/app';

export interface GameHistoryEntry {
    roomCreatorUsername: string;
    roomCreatorId: string;
    roomId: string;
    deckname: string;
    icon: string;
    date: firebase.firestore.Timestamp;
}