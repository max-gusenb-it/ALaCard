import { TopicVotingResponse } from "../../response-data/poll-response";
import { DynamicRoundData } from "./dynamic-round-data";

export interface DynamicTopicVotingRoundData extends DynamicRoundData {
    responses: TopicVotingResponse[];
}