import { GameInformation, TutorialInfo } from "@shared";

export interface InformationStateModel {
    version: number;
    // ToDo: Move to room state
    gameInformations: GameInformation | undefined;
    tutorialInfos: TutorialInfo[];
    joinedInSingleDeviceMode: boolean;
}