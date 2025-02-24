import { CardService, DynamicRoundData, PlayerVotingCardService, Response, TopicVotingCardService } from "@features";
import { Card, PlayerVotingCard, TopicVotingCard, Result, ResultConfig, TopicVotingCardResultConfig } from "@shared";

export type GameCardService = CardService<Card, Response, DynamicRoundData, Result, ResultConfig> | PlayerVotingCardService | TopicVotingCardService<TopicVotingCard, TopicVotingCardResultConfig>;
export type GameCard = Card | PlayerVotingCard | TopicVotingCard;