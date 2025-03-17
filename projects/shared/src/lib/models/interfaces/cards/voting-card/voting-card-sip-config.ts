import { VotingCardGroup } from "@shared";

export interface VotingCardSipConfig {
    group?: VotingCardGroup;
    distribute?: boolean;
    sips?: number;
    subjectIDs?: string[];
}