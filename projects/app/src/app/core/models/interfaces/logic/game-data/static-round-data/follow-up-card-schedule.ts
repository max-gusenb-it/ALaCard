export interface FollowUpCardSchedule {
    scheduledRoundId: number;
    cardState: string;
    cardIndex: number;
    sourceCardPlayerIds?: string[];
}