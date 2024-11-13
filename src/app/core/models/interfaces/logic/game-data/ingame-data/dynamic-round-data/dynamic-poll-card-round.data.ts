import { PollResponse } from "../../response-data/poll-response";
import { DynamicRoundData } from "./dynamic-round-data";

export interface DynamicPollRoundData extends DynamicRoundData {
    responses: PollResponse[];
    /** ToDo: Player Id who payed to display voting results */
    payToDisplayPlayerId?: string;
}