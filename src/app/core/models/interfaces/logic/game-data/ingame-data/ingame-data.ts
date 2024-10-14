import { FirestoreBase } from "../../firestore-base";
import { DynamicRoundData } from "./dynamic-round-data/dynamic-round-data";

export interface IngameData extends FirestoreBase {
    dynamicRoundData: DynamicRoundData | null;
}