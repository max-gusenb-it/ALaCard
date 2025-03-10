import { VotingCardGroup } from "@shared";

// ToDo - structure: Make both optional
export interface VotingCardSipConfig {
    group: VotingCardGroup;
    distribute: boolean;
}