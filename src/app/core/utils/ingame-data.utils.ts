import firebase from 'firebase/compat/app';
import { IngameData } from "../models/interfaces";

export namespace IngameDataUtils {
    export function createInitialIngameData() : IngameData {
        return {
            creationDate: firebase.firestore.Timestamp.fromDate(new Date())
        };
    }
}