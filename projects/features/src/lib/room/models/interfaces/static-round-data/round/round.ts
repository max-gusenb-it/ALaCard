export interface Round {
    id: number;
    cardIndex: number;
    /**
     * Ids of players that are mentioned in card text
     */
    playerIds?: string[];
    
    /**
     * State of the card in the round
     *
     * @type {number}
     */
    cardState: string;
}