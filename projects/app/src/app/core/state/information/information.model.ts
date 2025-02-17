import { GameInformation, TutorialInfo } from "../../models/interfaces";

export interface InformationStateModel {
    version: number;
    gameInformations: GameInformation | undefined;
    tutorialInfos: TutorialInfo[];
}