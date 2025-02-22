import firebase from 'firebase/compat/app';
import { IngameData } from '@features';

export namespace IngameDataUtils {
    export function createInitialIngameData() : IngameData {
        return {
            creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
            dynamicRoundData: null,
            playerData: []
        };
    }
}