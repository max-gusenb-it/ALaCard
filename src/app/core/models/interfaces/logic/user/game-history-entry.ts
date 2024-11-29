import firebase from 'firebase/compat/app';

export interface GameHistoryEntry {
    compareValue: number;
    roomCreatorUsername: string;
    roomCreatorId: string;
    roomId: string;
    deckname: string;
    icon: string;
    date: firebase.firestore.Timestamp;
}