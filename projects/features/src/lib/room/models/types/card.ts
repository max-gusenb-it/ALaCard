import { CardService, DynamicRoundData, PlayerVotingCardService, Response, TopicVotingCardService, Result, ResultConfig, TopicVotingCardResultConfig } from "@features";
import { Card, PlayerVotingCard, TopicVotingCard } from "@shared";

export type GameCardService = CardService<Card, Response, DynamicRoundData, Result, ResultConfig> | PlayerVotingCardService | TopicVotingCardService<TopicVotingCard, TopicVotingCardResultConfig>;
export type GameCard = Card | PlayerVotingCard | TopicVotingCard;