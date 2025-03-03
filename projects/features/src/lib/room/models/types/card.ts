import { CardService, DynamicRoundData, PlayerVotingCardService, Response, TopicVotingCardService, Result } from "@features";
import { Card, PlayerVotingCard, TopicVotingCard } from "@shared";

export type GameCardService = CardService<Card, Response, DynamicRoundData, Result> | PlayerVotingCardService | TopicVotingCardService<TopicVotingCard>;
export type GameCard = Card | PlayerVotingCard | TopicVotingCard;