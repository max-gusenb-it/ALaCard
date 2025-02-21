export interface PlayerData {
    playerId: string;
    /** How many rounds has the user been inactive. Meaning how many rounds did the user not send a response */
    inactiveRoundsCount: number;
}