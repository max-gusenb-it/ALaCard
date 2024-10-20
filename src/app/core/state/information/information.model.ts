import { GameInformation, TutorialInfo } from "../../models/interfaces";

export interface InformationStateModel {
    gameInformations: GameInformation | undefined;
    tutorialInfos: TutorialInfo[];
}