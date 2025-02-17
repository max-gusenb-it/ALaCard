import { TutorialInfo } from "../../state/information/tutorial-info";
import { FirestoreBase } from "../firestore-base";
import { GameHistoryEntry } from "./game-history-entry";
import { Settings } from "./settings";

export interface User extends FirestoreBase {
    username: string;
    profilePicture: string;
    roomId: string | null;
    settings: Settings;
    tutorialInfos: TutorialInfo[];
    gameHistory: GameHistoryEntry[]
}