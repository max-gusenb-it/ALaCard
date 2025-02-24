import { TopicVotingResponse } from "../../response-data/topic-voting-response";
import { DynamicRoundData } from "./dynamic-round-data";

export interface DynamicTopicVotingRoundData extends DynamicRoundData {
    responses: TopicVotingResponse[];
}