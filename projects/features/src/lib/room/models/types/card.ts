import { CardService, DynamicRoundData, PlayerVotingCardService, Response, TopicVotingCardService } from "@features";
import { Card, PlayerVotingCard, PollCard, Result, ResultConfig } from "@shared";

export type GameCardService = CardService<Card, Response, DynamicRoundData, Result, ResultConfig> | PlayerVotingCardService | TopicVotingCardService;
export type GameCard = Card | PlayerVotingCard | PollCard;