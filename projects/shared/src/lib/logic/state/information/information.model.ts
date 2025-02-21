import { GameInformation, TutorialInfo } from "@shared";

export interface InformationStateModel {
    version: number;
    gameInformations: GameInformation | undefined;
    tutorialInfos: TutorialInfo[];
}