export interface Round {
    id: number;
    cardIndex: number;
    followUpCard: boolean;
    /**
     * Ids of players that are mentioned in card text
     */
    playerIds?: string[];
}