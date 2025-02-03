export interface Round {
    id: number;
    cardIndex: number;
    followUpCard: boolean;
    /**
     * Ids of players that are mentioned in card text
     */
    playerIds?: string[];
    /**
     * Follow up card index of current round. 0 means the parent card is active
     *
     * @type {number}
     */
    followUpCardIndex: number;
}