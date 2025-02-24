import { CardService, DynamicRoundData, PlayerVotingCardService, Response, TopicVotingCardService, Result, ResultConfig } from "@features";
import { Card, PlayerVotingCard, PollCard } from "@shared";

export type GameCardService = CardService<Card, Response, DynamicRoundData, Result, ResultConfig> | PlayerVotingCardService | TopicVotingCardService;
export type GameCard = Card | PlayerVotingCard | PollCard;